using back.Controllers;
using back.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using back.Helpers;
using service;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MyDbContext>();
builder.Services.AddScoped<AuthService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "front-origin",
                      policy =>
                      {
                          policy.WithOrigins(
                              "https://two025-1-p3-tiapn-si-grupo-4-2.onrender.com",
                              "http://localhost:5173",
                              "http://localhost:3000"
                          )
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                      });
});

var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? "A_VERY_LONG_AND_SECURE_KEY_FOR_PRODUCTION_MINIMUM_32_BYTES";
var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "yourdomain.com";
var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "youraudiencedomain.com";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AuthenticatedUser", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("AdminRole", policy => policy.RequireRole("Admin"));
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    MigrationManager.ManageAndApplyMigrations(app);
}

app.UseCors("front-origin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.AuthRoutes();
app.UsuarioRoutes();
app.HelloRoutes();
app.TarefaRoutes();
app.TarefaTemplateRoutes();
app.RotinaTemplateRoutes();
app.EmpresaRoutes();
app.InsumoRoutes();
app.RotinaRoutes();
app.LogRoutes();

app.Run("http://0.0.0.0:8080");

