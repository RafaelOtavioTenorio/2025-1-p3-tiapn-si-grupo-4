using System;

namespace back.DTOs;

public class TarefaTemplateDTO
{
    public required string Nome { get; set; }
    public required int? IdRotina { get; set; }
    public int Pai { get; set; }
    public int Prioridade { get; set; }
    public bool Ativo { get; set; }
}
