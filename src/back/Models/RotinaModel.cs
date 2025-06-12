using back.DTOs;

namespace back.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;


[Index(nameof(Nome), Name = "idx_rotina_nome")]
public class RotinaModel
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }
    
    public int IdTemplate { get; set; }
    
    [Required]
    [ForeignKey("IdTemplate")]
    public RotinaTemplateModel RotinaTemplate { get; set; }
    
    [Required]
    public string Nome { get; set; }
    
    public string? Descricao { get; set; }
    
    public DateTime? DataInicio { get; set; }
    
    public DateTime? DataFim { get; set; }
    
    public ICollection<TarefaModel> Tarefas { get; private set; } =  new List<TarefaModel>();
}