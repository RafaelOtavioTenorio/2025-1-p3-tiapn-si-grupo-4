using System.Text;
using System.Text.RegularExpressions;
using System.Security.Cryptography;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using back.Entities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace back.Helpers;

public class MigrationManager {


 public static void ManageAndApplyMigrations(WebApplication app)
{
    const string modelsPath = "Models";
    const string migrationsPath = "Migrations";
    const string hashFileName = ".efmodelhash";
    bool modelChangesDetected = false;

    WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
    WriteLineInColor("Verificando por alterações nos modelos EF Core...", ConsoleColor.Cyan);

    string projectRoot = Directory.GetCurrentDirectory();
    string fullModelsPath = Path.Combine(projectRoot, modelsPath);
    string fullMigrationsPath = Path.Combine(projectRoot, migrationsPath);
    string fullHashFilePath = Path.Combine(projectRoot, hashFileName);

    string? projectFile = Directory.GetFiles(projectRoot, "*.csproj").FirstOrDefault();
    if (string.IsNullOrEmpty(projectFile))
    {
        WriteLineInColor("ERRO: Nenhum arquivo .csproj encontrado no diretório. Abortando gestão de migrations.", ConsoleColor.Red);
        return;
    }

    string currentHash = GetModelsHash(fullModelsPath);
    string oldHash = File.Exists(fullHashFilePath) ? File.ReadAllText(fullHashFilePath) : "";

    if (string.IsNullOrEmpty(currentHash))
    {
        WriteLineInColor("Nenhum arquivo de modelo encontrado na pasta 'Models'. Verificação ignorada.", ConsoleColor.Yellow);
    }
    else if (currentHash != oldHash)
    {
        modelChangesDetected = true;
        WriteLineInColor("MUDANÇA DETETADA! Tentando criar uma nova migration...", ConsoleColor.Green);

        string migrationVersion = GetNextMigrationNumber(fullMigrationsPath);
        string migrationName = $"AutoMigration_{migrationVersion}";
        WriteLineInColor($"Nome da migration a ser criada: {migrationName}", ConsoleColor.White);

        bool creationSuccess = ExecuteDotnetEfCommand($"migrations add {migrationName}", projectFile, projectRoot);

        if (creationSuccess)
        {
            File.WriteAllText(fullHashFilePath, currentHash);
            WriteLineInColor($"Novo hash dos modelos salvo em '{hashFileName}'.", ConsoleColor.Gray);
        }
        else
        {
            WriteLineInColor("Criação da migration falhou. A aplicação de migrations será ignorada.", ConsoleColor.Red);
            return;
        }
    }
    else
    {
        WriteLineInColor("Nenhuma mudança detetada nos modelos.", ConsoleColor.Gray);
    }

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    var pendingMigrations = dbContext.Database.GetPendingMigrations();
    if (pendingMigrations.Any())
    {   
        modelChangesDetected = true;
        WriteLineInColor("Migrations pendentes encontradas. Aplicando...", ConsoleColor.Yellow);
    }

    if(modelChangesDetected)
    {
        WriteLineInColor("Aguardando sistema de arquivos...", ConsoleColor.DarkGray);
        Thread.Sleep(2000);
        WriteLineInColor("Verificando e aplicando migrations pendentes no banco de dados...", ConsoleColor.Cyan);
        ExecuteDotnetEfCommand("database update", projectFile, projectRoot);
    }

    WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
}


public static bool ExecuteDotnetEfCommand(string command, string projectFile, string workingDirectory)
{
    var process = new Process
    {
        StartInfo = new ProcessStartInfo
        {
            FileName = "dotnet",
            Arguments = $"ef {command} --context MyDbContext --project \"{projectFile}\" --startup-project \"{projectFile}\"",
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
            WorkingDirectory = workingDirectory
        }
    };

    var outputBuilder = new StringBuilder();
    process.OutputDataReceived += (sender, args) => { if (args.Data != null) outputBuilder.AppendLine(args.Data); };
    process.ErrorDataReceived += (sender, args) => { if (args.Data != null) outputBuilder.AppendLine(args.Data); };

    process.Start();
    process.BeginOutputReadLine();
    process.BeginErrorReadLine();
    process.WaitForExit();

    if (process.ExitCode == 0)
    {
        WriteLineInColor($"SUCESSO ao executar: dotnet ef {command}", ConsoleColor.Green);
        string output = outputBuilder.ToString();
        if(!string.IsNullOrWhiteSpace(output) && !output.Contains("No migrations were applied"))
        {
            Console.WriteLine(output);
        }
        return true;
    }
    else
    {
        WriteLineInColor($"ERRO (código {process.ExitCode}) ao executar: dotnet ef {command}", ConsoleColor.Red);
        WriteLineInColor("--- Saída do Processo ---", ConsoleColor.DarkYellow);
        Console.WriteLine(outputBuilder.ToString());
        WriteLineInColor("-------------------------", ConsoleColor.DarkYellow);
        return false;
    }
}


public static string GetModelsHash(string fullPath)
{
    if (!Directory.Exists(fullPath)) return "";

    var files = Directory.GetFiles(fullPath, "*.cs", SearchOption.AllDirectories);
    if (files.Length == 0) return "";

    var allContent = new StringBuilder();
    foreach (var file in files.OrderBy(f => f))
    {
        allContent.Append(File.ReadAllText(file));
    }

    using var sha256 = SHA256.Create();
    byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(allContent.ToString()));
    return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
}


public static string GetNextMigrationNumber(string fullMigrationsPath)
{
    if (!Directory.Exists(fullMigrationsPath)) return "001";

    int latestNumber = 0;
    var regex = new Regex(@"AutoMigration_(\d+)");
    var migrationFiles = Directory.GetFiles(fullMigrationsPath, "*_AutoMigration_*.cs", SearchOption.TopDirectoryOnly);

    foreach (var file in migrationFiles)
    {
        var match = regex.Match(Path.GetFileNameWithoutExtension(file));
        if (match.Success && int.TryParse(match.Groups[1].Value, out int currentNumber))
        {
            if (currentNumber > latestNumber) latestNumber = currentNumber;
        }
    }
    return (latestNumber + 1).ToString("D3");
}


public static void WriteLineInColor(string text, ConsoleColor color)
{
    Console.ForegroundColor = color;
    Console.WriteLine(text);
    Console.ResetColor();
}

}