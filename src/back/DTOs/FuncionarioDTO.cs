namespace back.DTOs
{
    public class FuncionarioDTO
    {
        public int UsuarioId { get; set; }
        public int EmpresaId { get; set; }

        public string Nome { get; set; } = string.Empty;
        public string CPF { get; set; } = string.Empty;
        public int NivelAcesso { get; set; }
    }
}