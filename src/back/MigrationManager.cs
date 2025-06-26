using back.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace back.Helpers;

public static class MigrationManager
{
    public static void ManageAndApplyMigrations(WebApplication app)
    {
        const string modelsPath = "Models"; 
        const string migrationsPath = "Migrations";
        const string hashFileName = ".efmodelhash";

        WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
        WriteLineInColor("Verificando por alterações nos modelos EF Core...", ConsoleColor.Cyan);

        string projectRoot = Directory.GetCurrentDirectory();
        string fullModelsPath = Path.Combine(projectRoot, modelsPath);
        string fullMigrationsPath = Path.Combine(projectRoot, migrationsPath);
        string fullHashFilePath = Path.Combine(projectRoot, hashFileName);

        string? projectFile = Directory.GetFiles(projectRoot, "*.csproj").FirstOrDefault();
        if (string.IsNullOrEmpty(projectFile))
        {
            WriteLineInColor("ERRO: Nenhum arquivo .csproj encontrado. Abortando...", ConsoleColor.Red);
            return;
        }

        string currentHash = GetModelsHash(fullModelsPath);
        string oldHash = File.Exists(fullHashFilePath) ? File.ReadAllText(fullHashFilePath) : "";

        if (!string.IsNullOrEmpty(currentHash) && currentHash != oldHash)
        {
            WriteLineInColor("MUDANÇA DETETADA! Tentando criar uma nova migration...", ConsoleColor.Green);
            string migrationName = $"AutoMigration_{GetNextMigrationNumber(fullMigrationsPath)}";
            
            bool creationSuccess = ExecuteDotnetEfCommand($"migrations add {migrationName}", projectFile, projectRoot);

            if (creationSuccess)
            {
                File.WriteAllText(fullHashFilePath, currentHash);
                WriteLineInColor($"Novo hash dos modelos salvo em '{hashFileName}'.", ConsoleColor.Gray);
            }
            else
            {
                WriteLineInColor("Criação da migration falhou. Verifique os erros acima.", ConsoleColor.Red);
            }
        }
        else
        {
            WriteLineInColor("Nenhuma mudança detetada nos modelos.", ConsoleColor.Gray);
        }

        WriteLineInColor("Verificando e aplicando migrations pendentes no banco de dados...", ConsoleColor.Cyan);
        
        try
        {
            using var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();

            var pendingMigrations = dbContext.Database.GetPendingMigrations();
            if (pendingMigrations.Any())
            {
                WriteLineInColor($"Encontrada(s) {pendingMigrations.Count()} migração(ões) pendente(s). Aplicando...", ConsoleColor.Yellow);
                
                dbContext.Database.Migrate();
                
                WriteLineInColor("Migrations aplicadas com sucesso ao banco de dados.", ConsoleColor.Green);
            }
            else
            {
                WriteLineInColor("O banco de dados já está atualizado.", ConsoleColor.Gray);
            }
        }
        catch (Exception ex)
        {
            WriteLineInColor("ERRO ao aplicar migrations ao banco de dados:", ConsoleColor.Red);
            WriteLineInColor(ex.ToString(), ConsoleColor.Red);
        }

        WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
    }

    private static bool ExecuteDotnetEfCommand(string command, string projectFile, string workingDirectory)
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

        string output = outputBuilder.ToString();

        if (process.ExitCode == 0)
        {
            WriteLineInColor($"SUCESSO ao executar: dotnet ef {command}", ConsoleColor.Green);
            if (!string.IsNullOrWhiteSpace(output)) Console.WriteLine(output);
            return true;
        }
        else
        {
            WriteLineInColor($"ERRO (código {process.ExitCode}) ao executar: dotnet ef {command}", ConsoleColor.Red);
            if (!string.IsNullOrWhiteSpace(output)) Console.WriteLine(output);
            return false;
        }
    }

    private static string GetModelsHash(string fullPath)
    {
        if (!Directory.Exists(fullPath)) return "";

        var files = Directory.GetFiles(fullPath, "*.cs", SearchOption.AllDirectories);
        if (files.Length == 0) return "";

        var allContent = new StringBuilder();
        foreach (var file in files.OrderBy(f => f))
        {
            allContent.Append(File.ReadAllText(file).Replace("\r\n", "\n")); 
        }

        using var sha256 = SHA256.Create();
        byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(allContent.ToString()));
        return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
    }

    private static string GetNextMigrationNumber(string fullMigrationsPath)
    {
        if (!Directory.Exists(fullMigrationsPath)) return "001";

        int latestNumber = 0;
        var regex = new Regex(@"_AutoMigration_(\d+)");
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

    private static void WriteLineInColor(string text, ConsoleColor color)
    {
        Console.ForegroundColor = color;
        Console.WriteLine(text);
        Console.ResetColor();
    }
}