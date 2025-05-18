using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Data
{
    public class UsuarioContext : DbContext
    {
        public DbSet<UsuarioModel> Usuario { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
