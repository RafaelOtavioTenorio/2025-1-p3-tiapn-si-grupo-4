namespace back.DTOs;

public class RotinaDTO
{
    public int Id { get; set; }
    
    public int IdTemplate {get; set;}
    
    public string Nome {get; set;}
    
    public int Prioridade {get; set;}
    
    public string? Descricao {get; set;}
    
    public List<TarefaOnRotinaDTO> Tarefas {get; set;}
}

public class RotinaCreateDto
{
    public int IdRotinaTemplate  { get; set; }
    public string Nome { get; set; } =  string.Empty;
    public string? Descricao { get; set; }
}

public class UpdateRotinaDTO
{
    public string Nome { get; set; }
    public string Descricao { get; set; }
}

public class TarefaOnRotinaDTO
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public int Prioridade { get; set; }
    public int? Pai { get; set; }
}