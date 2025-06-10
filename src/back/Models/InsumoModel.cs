using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
namespace back.Models;

public class InsumoModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Nome { get; set; } = "";

    [Required]
    [StringLength(1000)]
    public string Descricao { get; set; } = "";

    [Required]
    public int TarefaID { get; set; }

    [ForeignKey("TarefaID")]
    public TarefaModel? Tarefa { get; set; } 
}
