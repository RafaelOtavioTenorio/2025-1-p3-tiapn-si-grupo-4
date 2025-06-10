using back.DTOs;
using back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using back.Entities;
namespace back.Controllers;

public static class InsumoController
{
    public static void InsumoRoutes(this WebApplication app)
    {
        var route = app.MapGroup("insumo");

        route.MapGet("", GetAllInsumos);
        route.MapGet("{id:int}", GetInsumoById);
        route.MapPost("", CreateInsumo);
        route.MapPut("{id:int}", UpdateInsumo);
        route.MapDelete("{id:int}", DeleteInsumo);
    }

    private static async Task<IResult> GetAllInsumos(MyDbContext context)
    {
        try
        {
            var insumos = await context.Insumos.ToListAsync();
            return Results.Ok(insumos);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar insumos: {e.Message}");
            return Results.Problem("Ocorreu um erro ao buscar os insumos.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetInsumoById(int id, MyDbContext context)
    {
        try
        {
            var insumo = await context.Insumos.FindAsync(id);
            if (insumo == null)
                return Results.NotFound($"Insumo com ID {id} não encontrado.");

            return Results.Ok(insumo);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar insumo por ID: {e.Message}");
            return Results.Problem($"Ocorreu um erro ao buscar o insumo com ID {id}.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> CreateInsumo(InsumoDTO req, MyDbContext context)
    {
        try
        {
            var tarefa = await context.Tarefas.FindAsync(req.TarefaID);
            if (tarefa == null)
                return Results.BadRequest($"Tarefa com ID {req.TarefaID} não existe.");

            var insumo = new InsumoModel
            {
                Nome = req.Nome,
                Descricao = req.Descricao,
                TarefaID = req.TarefaID
            };

            await context.Insumos.AddAsync(insumo);
            await context.SaveChangesAsync();

            return Results.Created($"/insumo/{req.UniqueID}", insumo);
        }
        catch (ArgumentException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao criar insumo: {e.Message}");
            return Results.Problem("Ocorreu um erro ao criar o insumo.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> UpdateInsumo(int id, InsumoDTO req, MyDbContext context)
    {
        try
        {
            var insumo = await context.Insumos.FindAsync(id);
            if (insumo == null)
                return Results.NotFound($"Insumo com ID {id} não encontrado.");

            var tarefa = await context.Tarefas.FindAsync(req.TarefaID);
            if (tarefa == null)
                return Results.BadRequest($"Tarefa com ID {req.TarefaID} não existe.");

            insumo.Nome = req.Nome;
            insumo.Descricao = req.Descricao;
            insumo.TarefaID = req.TarefaID;

            await context.SaveChangesAsync();
            return Results.Ok(insumo);
        }
        catch (ArgumentException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao atualizar insumo: {e.Message}");
            return Results.Problem("Ocorreu um erro ao atualizar o insumo.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> DeleteInsumo(int id, MyDbContext context)
    {
        try
        {
            var insumo = await context.Insumos.FindAsync(id);
            if (insumo == null)
                return Results.NotFound($"Insumo com ID {id} não encontrado.");

            context.Insumos.Remove(insumo);
            await context.SaveChangesAsync();

            return Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao excluir insumo: {e.Message}");
            return Results.Problem("Ocorreu um erro ao excluir o insumo.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}