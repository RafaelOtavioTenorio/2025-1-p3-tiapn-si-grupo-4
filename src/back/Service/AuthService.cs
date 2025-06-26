using back.Entities;
using Microsoft.EntityFrameworkCore;
using back.Models;
using System.Security.Claims;

namespace service;

public class AuthService
{
    private readonly MyDbContext _context;

    public AuthService(MyDbContext context)
    {
        _context = context;
    }

    public (UserModel? User, string? Error) Autenticar(string login, string senha)
    {
        var loginModel = _context.Login
            .Include(l => l.Usuario)
            .FirstOrDefault(l => l.Login == login);

        if (loginModel == null)
            return (null, "Usuário não encontrado");

        if (!loginModel.Usuario.Ativo)
            return (null, "Usuário está inativo");

        if (!BCrypt.Net.BCrypt.Verify(senha, loginModel.Senha))
            return (null, "Senha incorreta");

        return (loginModel.Usuario, null);
    }

    public List<Claim> GerarClaims(UserModel usuario)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, usuario.ID.ToString()),
            new Claim(ClaimTypes.Name, usuario.Nome),
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim("NivelAcesso", usuario.NivelAcesso.ToString())
        };

        // Adiciona role baseada no nível de acesso
        if (usuario.NivelAcesso >= 2)
        {
            claims.Add(new Claim(ClaimTypes.Role, "Admin"));
        }
        else
        {
            claims.Add(new Claim(ClaimTypes.Role, "User"));
        }

        return claims;
    }

    public bool ValidarSenha(string senha)
    {
        // Mínimo 8 caracteres
        if (senha.Length < 8)
            return false;

        // Pelo menos uma letra maiúscula
        if (!senha.Any(char.IsUpper))
            return false;

        // Pelo menos uma letra minúscula
        if (!senha.Any(char.IsLower))
            return false;

        // Pelo menos um número
        if (!senha.Any(char.IsDigit))
            return false;

        return true;
    }
}