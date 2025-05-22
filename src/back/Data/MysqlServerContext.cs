using Microsoft.EntityFrameworkCore;
using back.Models;
using DotNetEnv;

namespace back.Entities;

public partial class MyDbContext : DbContext
{
    public DbSet<LogModel> Logs { get; set; }
    public DbSet<EmpresaModel> Empresas { get; set; }

    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            DotNetEnv.Env.Load();
            var host = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
            var port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "3306";
            var database = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? "routix";
            var user = Environment.GetEnvironmentVariable("DATABASE_USER") ?? "root"; // Changed to root
            var password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "1234"; // Match Program.cs

            var connectionString = $"Server={host};Port={port};Database={database};User Id={user};Password={password};";
            Console.WriteLine($"Connection String: {connectionString}"); // For debugging
            optionsBuilder.UseMySql(
                connectionString,
                new MySqlServerVersion(new Version(8, 0, 21))
            );
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}