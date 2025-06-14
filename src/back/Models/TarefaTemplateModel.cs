using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
namespace back.Models;

public class TarefaTemplateModel
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int ID { get; init; }

  [Required]
  [StringLength(255)]
  public string Nome { get; set; } = string.Empty;

  public int IdRotina { get; set; }

  [Required]
  [ForeignKey("IdRotina")]
  public virtual RotinaTemplateModel Rotina { get; set; } = null!;

  [ForeignKey("Tarefa")]
  public int? Pai { get; set; }

  public int Prioridade { get; set; }

  public bool Ativo { get; set; } = true;
  public ICollection<InsumoModel> Insumos { get; set; } = new List<InsumoModel>();

}