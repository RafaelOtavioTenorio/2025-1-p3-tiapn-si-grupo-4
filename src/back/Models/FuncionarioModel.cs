using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back.Models
{
    public class FuncionarioModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; init; }
        public int UsuarioId { get; set; }
        public UserModel Usuario { get; set; } = null!;

        public int EmpresaId { get; set; }
        public EmpresaModel Empresa { get; set; } = null!;
    }
}
