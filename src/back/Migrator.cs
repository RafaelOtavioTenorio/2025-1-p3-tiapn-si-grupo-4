// FILE: Helpers/MigrationHelper.cs
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace back.Helpers;

public static class MigrationHelper
{
    private const string ModelsPath = "Models";
    private const string MigrationsPath = "Migrations";
    private const string HashFileName = ".efmodelhash";

    /// <summary>
    /// Verifica se houve alterações nos modelos e, se houver, cria uma nova migration.
    /// Este método só deve ser chamado em ambiente de desenvolvimento.
    /// </summary>
    public static void EnsureMigrations()
    {
        WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
        WriteLineInColor("A verificar por alterações nos modelos para criar migration...", ConsoleColor.Cyan);

        string currentHash = GetModelsHash(ModelsPath);
        if (string.IsNullOrEmpty(currentHash))
        {
            WriteLineInColor("Nenhum ficheiro de modelo encontrado. A saltar a criação de migrations.", ConsoleColor.Yellow);
            WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
            return;
        }

        string oldHash = File.Exists(HashFileName) ? File.ReadAllText(HashFileName) : "";

        if (currentHash != oldHash)
        {
            WriteLineInColor("MUDANÇA DETETADA! A criar uma nova migration...", ConsoleColor.Green);

            string nextMigrationNumber = GetNextMigrationNumber(MigrationsPath);
            string migrationName = $"AutoMigration_{nextMigrationNumber}";

            WriteLineInColor($"A executar: dotnet ef migrations add {migrationName}", ConsoleColor.Green);

            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "dotnet",
                    Arguments = $"ef migrations add {migrationName}",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            process.WaitForExit();

            if (process.ExitCode == 0)
            {
                WriteLineInColor($"Migration '{migrationName}' criada com sucesso!", ConsoleColor.Green);
                File.WriteAllText(HashFileName, currentHash);
                WriteLineInColor($"Ficheiro de estado '{HashFileName}' atualizado.", ConsoleColor.Green);
            }
            else
            {
                string error = process.StandardError.ReadToEnd();
                WriteLineInColor($"ERRO ao criar a migration: {error}", ConsoleColor.Red);
            }
        }
        else
        {
            WriteLineInColor("Nenhuma mudança detetada nos modelos. Tudo atualizado.", ConsoleColor.Gray);
        }
        WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
    }

    private static string GetModelsHash(string path)
    {
        try
        {
            var files = Directory.GetFiles(path, "*.cs", SearchOption.AllDirectories);
            if (files.Length == 0) return "";

            var allContent = new StringBuilder();
            foreach (var file in files.OrderBy(f => f))
            {
                allContent.Append(File.ReadAllText(file));
            }

            using var sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(allContent.ToString());
            byte[] hashBytes = sha256.ComputeHash(bytes);
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }
        catch (Exception ex)
        {
            WriteLineInColor($"Erro ao calcular o hash dos modelos: {ex.Message}", ConsoleColor.Red);
            return null;
        }
    }

    private static string GetNextMigrationNumber(string path)
    {
        int latestNumber = 0;
        var regex = new Regex(@"AutoMigration_(\d+)");
        
        if (Directory.Exists(path))
        {
            var migrationFiles = Directory.GetFiles(path, "AutoMigration_*.cs", SearchOption.TopDirectoryOnly);
            foreach (var file in migrationFiles)
            {
                var match = regex.Match(Path.GetFileNameWithoutExtension(file));
                if (match.Success && int.TryParse(match.Groups[1].Value, out int currentNumber))
                {
                    if (currentNumber > latestNumber)
                    {
                        latestNumber = currentNumber;
                    }
                }
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