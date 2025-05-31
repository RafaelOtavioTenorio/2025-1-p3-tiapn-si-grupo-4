using System;

namespace back.DTOs;

public class TarefaDTO
{
    public int? IdTarefa { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public bool? FoiExecutada { get; set; }
    public DateTime? DataInicio { get; set; }
    public DateTime? DataFim { get; set; }
}
