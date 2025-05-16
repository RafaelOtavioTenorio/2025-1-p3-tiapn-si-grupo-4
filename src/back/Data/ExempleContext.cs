using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Entities;

public class ExempleContext : DbContext
{
    public DbSet<ExempleModel> Exemple { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //Configurar banco para poder atualizar a connectionString
        optionsBuilder.UseSqlServer("Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;");
        base.OnConfiguring(optionsBuilder);
    }
}