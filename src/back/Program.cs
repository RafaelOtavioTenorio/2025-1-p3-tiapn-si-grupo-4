using back.Controllers;
using back.Entities;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MyDbContext>(); // No configuration here, relies on MyDbContext
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.LogRoutes();
// app.UseHttpsRedirection(); // Comment out to avoid HTTPS warning for now

app.Run("http://localhost:3000");