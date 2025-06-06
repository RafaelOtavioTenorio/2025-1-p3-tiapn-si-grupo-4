namespace back.DTOs;

public class RotinaTemplateDTO
{
    public int Id { get; set; }
    
    public string Nome { get; set; } = string.Empty;
    
    public EmpresaDTO Empresa { get; set; }
    
    public int Prioridade { get; set; }
    
    public string Descricao { get; set; }
    
    public bool Ativo { get; set; }
    
    public List<TarefaTemplateOnRotinaDTO> TarefasTemplates { get; set; } =  new List<TarefaTemplateOnRotinaDTO>();
}

public class UpdateRotinaTemplateDTO
{
    public string Nome { get; set; } = string.Empty;
    
    public int Prioridade { get; set; }
    
    public string Descricao { get; set; }
}

public class RotinaTemplateCreateDto
{
    public string Nome { get; set; } = string.Empty;
    
    public int IdEmpresa { get; set; }
    
    public int Prioridade { get; set; }
    
    public string Descricao { get; set; }
}

public class TarefaTemplateOnRotinaDTO
{
    public int Id { get; set; }
    public required string Nome { get; set; }
    public int? Pai { get; set; }
    public int Prioridade { get; set; }
    public bool Ativo { get; set; }
}
