using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using back.DTOs;
using back.Entities;
using back.Models;   
using dto;
using Microsoft.IdentityModel.Tokens;
using service; 

namespace back.Controllers;

public static class AuthController
{
    public static void AuthRoutes(this WebApplication app)
    {
        var authGroup = app.MapGroup("/auth").AllowAnonymous();


        authGroup.MapPost("/check", (AuthCheckDTO request, AuthService authService, IConfiguration configuration, MyDbContext context) =>
        {
            try
            {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured."));

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = configuration["Jwt:Audience"],
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            tokenHandler.ValidateToken(request.authToken, validationParameters, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var exp = jwtToken.ValidTo;

            if (exp < DateTime.UtcNow || exp > DateTime.UtcNow.AddHours(1))
            {
                return Results.Json(new { Valid = false, Error = "Token expirado ou inválido." }, statusCode: StatusCodes.Status401Unauthorized);
            }

            return Results.Json(new { Valid = true });
            }
            catch (SecurityTokenExpiredException)
            {
            return Results.Json(new { Valid = false, Error = "Token expirado." }, statusCode: StatusCodes.Status401Unauthorized);
            }
            catch (Exception)
            {
            return Results.Json(new { Valid = false, Error = "Token inválido." }, statusCode: StatusCodes.Status401Unauthorized);
            }
        });

        authGroup.MapPost("/refresh", (
            AuthCheckDTO request,
            AuthService authService,
            IConfiguration configuration,
            MyDbContext context
        ) =>
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured."));

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = configuration["Jwt:Audience"],
                    ValidateLifetime = false,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(request.authToken, validationParameters, out SecurityToken validatedToken);

                var jwtToken = validatedToken as JwtSecurityToken;
                if (jwtToken == null)
                    return Results.Json(new { Error = "Token inválido." }, statusCode: StatusCodes.Status401Unauthorized);

                if (jwtToken.ValidTo > DateTime.UtcNow.AddHours(1))
                    return Results.Json(new { Error = "Token ainda válido, não é necessário refresh." }, statusCode: StatusCodes.Status400BadRequest);

                var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var usuario = context.Users.FirstOrDefault(u => u.Email == email);

                if (usuario == null)
                    return Results.Json(new { Error = "Usuário não encontrado." }, statusCode: StatusCodes.Status401Unauthorized);

                var claims = authService.GerarClaims(usuario);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    Issuer = configuration["Jwt:Issuer"],
                    Audience = configuration["Jwt:Audience"]
                };

                var newToken = tokenHandler.CreateToken(tokenDescriptor);
                var newTokenString = tokenHandler.WriteToken(newToken);

                context.Login.Add(new LoginModel
                {
                    Usuario = usuario,
                    Token = newTokenString,
                    DataLogin = DateTime.Now,
                });
                context.SaveChanges();

                return Results.Ok(new
                {
                    Token = newTokenString,
                    User = new
                    {
                        usuario.ID,
                        usuario.Nome,
                        usuario.Email,
                        usuario.NivelAcesso
                    }
                });
            }
            catch (SecurityTokenException)
            {
                return Results.Json(new { Error = "Token inválido." }, statusCode: StatusCodes.Status401Unauthorized);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro durante o refresh: {e.Message}");
                return Results.Problem("Ocorreu um erro inesperado durante o refresh.", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        authGroup.MapPost("/login", (
            LoginRequest request,
            AuthService authService,
            IConfiguration configuration,
            MyDbContext context
        ) =>
        {
            try
            {
                var (usuario, error) = authService.Autenticar(request.Login, request.Senha);

                if (usuario == null)
                    return Results.Json(new { Error = error }, statusCode: StatusCodes.Status401Unauthorized);

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured."));

                var claims = authService.GerarClaims(usuario);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                    Issuer = configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("JWT Issuer not configured."),
                    Audience = configuration["Jwt:Audience"] ?? throw new InvalidOperationException("JWT Audience not configured.")
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);


                context.Login.Add(new LoginModel
                {
                    Usuario = usuario,
                    Token = tokenString,
                    DataLogin = DateTime.Now,

                });
                context.SaveChanges();

                return Results.Ok(new
                {
                    Token = tokenString,
                    User = new
                    {
                        usuario.ID,
                        usuario.Nome,
                        usuario.Email,
                        usuario.NivelAcesso
                    }
                });


            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine($"Erro de configuração JWT: {ex.Message}");
                return Results.Problem("Erro de configuração do servidor. Contate o administrador.", statusCode: StatusCodes.Status500InternalServerError);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro durante o login: {e.Message}");
                return Results.Problem("Ocorreu um erro inesperado durante o login.", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        // authGroup.MapPost("/signup", ...);
    }
    

}