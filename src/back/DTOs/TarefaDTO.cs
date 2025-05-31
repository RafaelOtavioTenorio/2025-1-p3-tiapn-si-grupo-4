using System;

namespace back.DTOs;

public class TarefaDTO
{
    public required int IdTarefa { get; set; }
    public required string Nome { get; set; }
    public required string Descricao { get; set; }
    public required bool FoiExecutada { get; set; }
    public DateTime? DataInicio { get; set; }
    public DateTime? DataFim { get; set; }
}
