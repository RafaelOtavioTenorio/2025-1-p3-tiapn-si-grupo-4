using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

  public int? Pai { get; set; }
  
  [ForeignKey("Pai")]
  public virtual TarefaTemplateModel? TarefaPai { get; set; }

  public int Prioridade { get; set; }

  public bool Ativo { get; set; } = true;
  public ICollection<InsumoModel> Insumos { get; set; } = new List<InsumoModel>();
  public ICollection<TarefaTemplateModel> Subtarefas { get; set; } = new List<TarefaTemplateModel>();
}