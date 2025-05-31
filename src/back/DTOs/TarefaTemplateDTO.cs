using System;

namespace back.DTOs;

public class TarefaTemplateDTO
{
    public string? Nome { get; set; }
    public int? IdRotina { get; set; }
    public int? Pai { get; set; }
    public int? Prioridade { get; set; }
    public bool? Ativo { get; set; }
}
