using back.DTOs;
using back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using back.Entities;

namespace back.Controllers;

public static class TarefaTemplateController
{
    public static void TarefaTemplateRoutes(this WebApplication app)
    {
        var route = app.MapGroup("tarefa-template");

        route.MapGet("", GetAllTarefaTemplates);
        route.MapGet("{id:int}", GetTarefaTemplateById);
        route.MapPost("", CreateTarefaTemplate);
        route.MapPut("{id:int}", UpdateTarefaTemplate);
        route.MapDelete("{id:int}", DeleteTarefaTemplate);
    }

    private static async Task<IResult> GetAllTarefaTemplates(MyDbContext context)
    {
        try
        {
            var templates = await context.TarefaTemplates.ToListAsync();
            return Results.Ok(templates);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar templates de tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao buscar os templates de tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> GetTarefaTemplateById(int id, MyDbContext context)
    {
        try
        {
            var template = await context.TarefaTemplates.FindAsync(id);
            if (template == null)
                return Results.NotFound($"Template de tarefa com ID {id} não encontrado.");

            return Results.Ok(template);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao buscar template de tarefa por ID: {e.Message}");
            return Results.Problem($"Ocorreu um erro ao buscar o template de tarefa com ID {id}.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> CreateTarefaTemplate(TarefaTemplateDTO req, MyDbContext context)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(req.Nome) || !req.IdRotina.HasValue)
            {
                return Results.BadRequest("Nome e IdRotina são obrigatórios para criar um TarefaTemplate.");
            }

            var template = new TarefaTemplateModel
            {
                Nome = req.Nome,
                IdRotina = req.IdRotina.Value,
                Pai = req.Pai,
                Prioridade = req.Prioridade,
                Ativo = req.Ativo
            };

            await context.TarefaTemplates.AddAsync(template);
            await context.SaveChangesAsync();
            return Results.Created($"/tarefa-template/{template.ID}", template);
        }
        catch (ArgumentException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao criar template de tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao criar o template de tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> UpdateTarefaTemplate(int id, TarefaTemplateDTO req, MyDbContext context)
    {
        try
        {
            var template = await context.TarefaTemplates.FindAsync(id);
            if (template == null)
                return Results.NotFound($"Template de tarefa com ID {id} não encontrado.");

            template.UpdateName(req.Nome);

            if (req.IdRotina.HasValue)
            {
                template.UpdateIdRotina(req.IdRotina.Value);
            }

            template.UpdatePai(req.Pai);
            template.UpdatePrioridade(req.Prioridade);

            template.Ativo = req.Ativo;

            await context.SaveChangesAsync();
            return Results.Ok(template);
        }
        catch (ArgumentException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao atualizar template de tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao atualizar o template de tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task<IResult> DeleteTarefaTemplate(int id, MyDbContext context)
    {
        try
        {
            var template = await context.TarefaTemplates.FindAsync(id);
            if (template == null)
                return Results.NotFound($"Template de tarefa com ID {id} não encontrado.");

            template.SetInactive();
            await context.SaveChangesAsync();
            return Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao desativar template de tarefa: {e.Message}");
            return Results.Problem("Ocorreu um erro ao desativar o template de tarefa.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}