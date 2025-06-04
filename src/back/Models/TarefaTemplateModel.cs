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

  [Required]
  [ForeignKey("Rotina")]
  public int IdRotina { get; set; }

  [ForeignKey("Tarefa")]
  public int Pai { get; set; }

  public int Prioridade { get; set; }

  public bool Ativo { get; set; } = true;

  //Métodos Set
  public void SetInactive() => Ativo = false;
  public void UpdateName(string nome)
  {
    if (string.IsNullOrWhiteSpace(nome))
    {
      throw new ArgumentException("O nome da tarefa não pode ser vazio ou nulo.", nameof(nome));
    }
    Nome = nome;
  }

  public void UpdatePrioridade(int prioridade)
  {
    if (prioridade < 0)
    {
      throw new ArgumentOutOfRangeException(nameof(prioridade), "A prioridade não pode ser negativa.");
    }
    Prioridade = prioridade;
  }

  public void UpdateIdRotina(int idRotina)
  {
    if (idRotina <= 0)
    {
      throw new ArgumentOutOfRangeException(nameof(idRotina), "O ID da rotina deve ser um valor positivo.");
    }
    IdRotina = idRotina;
  }

  public void UpdatePai(int pai)
  {
    if (pai <= 0)
    {
      throw new ArgumentOutOfRangeException(nameof(pai), "O ID da tarefa pai deve ser um valor positivo.");
    }
    Pai = pai;
  }
}