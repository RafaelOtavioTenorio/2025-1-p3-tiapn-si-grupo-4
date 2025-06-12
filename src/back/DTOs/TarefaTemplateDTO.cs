using System;

namespace back.DTOs;

public class TarefaTemplateDTO
{
    public int ID { get; set; }
    public required string Nome { get; set; }
    public required RotinaTemplateOnTarefaDTO Rotina { get; set; }
    public int? Pai { get; set; }
    public int Prioridade { get; set; }
    public bool Ativo { get; set; }
}

public class CreateTarefaTemplateDTO
{
    public required string Nome { get; set; }
    public required int? IdRotina { get; set; }
    public int Pai { get; set; }
    public int Prioridade { get; set; }
    public bool Ativo { get; set; }
}

public class UpdateTarefaTemplateDTO
{
    public required string Nome { get; set; }
    public required int? IdRotina { get; set; }
    public int Pai { get; set; }
    public int Prioridade { get; set; }
    public bool Ativo { get; set; }
}

public class RotinaTemplateOnTarefaDTO
{
    public int Id  { get; set; }
    public string Nome { get; set; } = string.Empty;
    
    public int EmpresaId { get; set; }
    
    public int Prioridade { get; set; }
    
    public string Descricao { get; set; }
}