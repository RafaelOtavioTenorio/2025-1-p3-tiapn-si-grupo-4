
using System;

namespace back.DTOs;
public class InsumoDTO
{
    public int? UniqueID { get; set; }


    public required string Nome { get; set; }

    public required string Descricao { get; set; }

    public required int TarefaID { get; set; }
}
