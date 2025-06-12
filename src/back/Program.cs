using back.Controllers;
using back.Entities;
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURAÇÃO DE SERVIÇOS ---
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MyDbContext>();
builder.Services.AddScoped<service.AuthService>();

// Configuração de Autenticação e Autorização
var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? "A_VERY_LONG_AND_SECURE_KEY_FOR_PRODUCTION_MINIMUM_32_BYTES";
var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "yourdomain.com";
var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "youraudiencedomain.com";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUser", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("AdminRole", policy => policy.RequireRole("Admin"));
});

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "front-origin", policy =>
    {
        policy.WithOrigins(Environment.GetEnvironmentVariable("FRONT_URL") ?? "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


// --- 2. CONSTRUÇÃO DA APLICAÇÃO ---
var app = builder.Build();


// --- 3. LÓGICA DE INICIALIZAÇÃO (APENAS EM DESENVOLVIMENTO) ---
if (app.Environment.IsDevelopment())
{
     // Passo 1: Verifica por alterações e cria a migration se necessário.
     EnsureMigrations();

    // Passo 2: Aplica as migrations pendentes ao banco de dados.
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var logger = services.GetRequiredService<ILogger<Program>>();
        try
        {
            var context = services.GetRequiredService<MyDbContext>();
            var pendingMigrations = context.Database.GetPendingMigrations();

            if (pendingMigrations.Any())
            {
                logger.LogInformation("Aplicando {count} migração(ões) pendente(s)...", pendingMigrations.Count());
                context.Database.Migrate();
                logger.LogInformation("Migrations aplicadas com sucesso.");
            }
            else
            {
                logger.LogInformation("O banco de dados já está atualizado.");
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ocorreu um erro ao aplicar as migrations.");
        }
    }
}


// --- 4. CONFIGURAÇÃO DO PIPELINE HTTP ---
app.UseCors("front-origin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

// Mapeamento das rotas
app.AuthRoutes();
app.UsuarioRoutes();
app.HelloRoutes();
app.TarefaRoutes();
app.TarefaTemplateRoutes();
app.RotinaTemplateRoutes();
app.LogRoutes();

app.Run("http://localhost:3000");


// --- FUNÇÕES AUXILIARES PARA GESTÃO DE MIGRATIONS ---

void EnsureMigrations()
{
    const string modelsPath = "Entities"; 
    const string migrationsPath = "Migrations";
    const string hashFileName = ".efmodelhash";

    WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
    WriteLineInColor("Verificando por alterações nos modelos...", ConsoleColor.Cyan);

    string currentHash = GetModelsHash(modelsPath);
    string oldHash = File.Exists(hashFileName) ? File.ReadAllText(hashFileName) : "";

    if (currentHash != oldHash)
    {
        WriteLineInColor("MUDANÇA DETETADA! A criar uma nova migration...", ConsoleColor.Green);

        string migrationName = $"AutoMigration_{GetNextMigrationNumber(migrationsPath)}";
        
        var process = new Process {
            StartInfo = new ProcessStartInfo {
                FileName = "dotnet",
                Arguments = $"ef migrations add {migrationName}",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        // CORREÇÃO: Lê as saídas de forma assíncrona para evitar deadlock.
        var outputBuilder = new StringBuilder();
        process.OutputDataReceived += (sender, args) => {
            if (args.Data != null) {
                outputBuilder.AppendLine(args.Data);
                Console.WriteLine(args.Data); // Mostra a saída em tempo real
            }
        };
        process.ErrorDataReceived += (sender, args) => {
            if (args.Data != null) {
                WriteLineInColor(args.Data, ConsoleColor.DarkYellow); // Mostra erros/avisos em tempo real
            }
        };

        process.Start();
        process.BeginOutputReadLine(); // Inicia a leitura assíncrona da saída padrão
        process.BeginErrorReadLine();  // Inicia a leitura assíncrona da saída de erro
        process.WaitForExit();         // Espera que o processo termine

        if (process.ExitCode == 0)
        {
            WriteLineInColor($"Migration '{migrationName}' criada com sucesso!", ConsoleColor.Green);
            File.WriteAllText(hashFileName, currentHash);
        }
        else
        {
            WriteLineInColor($"ERRO ao criar a migration. Verifique as mensagens acima.", ConsoleColor.Red);
        }
    }
    else
    {
        WriteLineInColor("Nenhuma mudança detetada nos modelos. Tudo atualizado.", ConsoleColor.Gray);
    }
    WriteLineInColor("----------------------------------------------------", ConsoleColor.Cyan);
}

string GetModelsHash(string path)
{
    if (!Directory.Exists(path)) return "";
    var files = Directory.GetFiles(path, "*.cs", SearchOption.AllDirectories);
    if (files.Length == 0) return "";
    var allContent = new StringBuilder();
    foreach (var file in files.OrderBy(f => f)) { allContent.Append(File.ReadAllText(file)); }
    using var sha256 = SHA256.Create();
    byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(allContent.ToString()));
    return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
}

string GetNextMigrationNumber(string path)
{
    if (!Directory.Exists(path)) return "001";
    int latestNumber = 0;
    var regex = new Regex(@"AutoMigration_(\d+)");
    var migrationFiles = Directory.GetFiles(path, "AutoMigration_*.cs", SearchOption.TopDirectoryOnly);
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

void WriteLineInColor(string text, ConsoleColor color)
{
    Console.ForegroundColor = color;
    Console.WriteLine(text);
    Console.ResetColor();
}