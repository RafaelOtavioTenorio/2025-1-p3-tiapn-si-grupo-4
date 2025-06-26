using back.DTOs;
using back.Entities;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

public static class RotinaController
{
    public static void RotinaRoutes(this WebApplication app)
    {
        var routes = app.MapGroup("Rotina");

        routes.MapGet("", FindAllRotinas);

        routes.MapGet("{id:int}", FindRotinaById);

        routes.MapPost("", CreateRotina);

        routes.MapPut("{id:int}", UpdateRotinaById);

        routes.MapDelete("{id:int}", DeleteRotina);
    }

    private static async Task<IResult> FindAllRotinas(MyDbContext context)
    {
        try
        {
            var templates = await context.Rotinas
                .Include(t => t.RotinaTemplate)
                .Include(t => t.Tarefas)
                .Select(t => new RotinaDTO
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    Prioridade = t.RotinaTemplate.Prioridade,
                    Descricao = t.Descricao,
                    Tarefas = t.Tarefas.Select(tarefa => new TarefaOnRotinaDTO
                    {
                        Id = tarefa.ID,
                        Nome = tarefa.Nome,
                        Pai = tarefa.TarefaID,
                        Prioridade = tarefa.Prioridade,
                    }).ToList()
                })
                .ToListAsync();

            return Results.Ok(templates);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(e.Message);
        }
    }

    private static async Task<IResult> FindRotinaById(int id, MyDbContext context)
    {
        try
        {
            var template = await context.Rotinas
                .Include(t => t.Tarefas)
                .Select(t => new RotinaDTO
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    Prioridade = t.RotinaTemplate.Prioridade,
                    Descricao = t.Descricao,
                    Tarefas = t.Tarefas.Select(tarefa => new TarefaOnRotinaDTO
                    {
                        Id = tarefa.ID,
                        Nome = tarefa.Nome,
                        Pai = tarefa.TarefaID,
                        Prioridade = tarefa.Prioridade,
                    }).ToList()
                }).FirstOrDefaultAsync(t => t.Id == id);

            return template is null ? Results.NotFound() : Results.Ok(template);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(e.Message);
        }
    }

    private static async Task<IResult> CreateRotina(RotinaCreateDto createDto, MyDbContext context)
    {
        try
        {
            var templateRef = await context.RotinaTemplates
                .Include(t => t.TarefasTemplates)
                .SingleOrDefaultAsync(r => r.Id == createDto.IdRotinaTemplate);

            if (templateRef is null)
                return Results.NotFound("Template de rotina não encontrado");

            var newRotina = new RotinaModel
            {
                Nome = createDto.Nome,
                Descricao = createDto.Descricao,
                IdTemplate = templateRef.Id
            };

            await context.Rotinas.AddAsync(newRotina);
            await context.SaveChangesAsync();

            foreach (var tarefasTemplate in templateRef.TarefasTemplates)
            {
                try
                {
                    var tarefa = new TarefaModel
                    {
                        Nome = tarefasTemplate.Nome,
                        Descricao = "Descricao",
                        FoiExecutada = false,
                        IdRotina = newRotina.Id,
                        Rotina = newRotina,
                        Prioridade = tarefasTemplate.Prioridade
                    };

                    await context.Tarefas.AddAsync(tarefa);
                    await context.SaveChangesAsync();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return Results.Problem("Erro ao tentar criar tarefas " + tarefasTemplate.Nome);
                }
            }

            var tarefasOnResult = new List<TarefaOnRotinaDTO>();

            foreach (var tarefa in newRotina.Tarefas)
            {
                var tarefaDto = new TarefaOnRotinaDTO
                {
                    Id = tarefa.ID,
                    Nome = tarefa.Nome,
                    Pai = tarefa.TarefaID
                };
                tarefasOnResult.Add(tarefaDto);
            }

            var newRotinaResult = new RotinaDTO
            {
                Id = newRotina.Id,
                Nome = newRotina.Nome,
                Descricao = newRotina.Descricao,
                IdTemplate = newRotina.IdTemplate,
                Prioridade = newRotina.RotinaTemplate.Prioridade,
                Tarefas = tarefasOnResult
            };

            return Results.Created($"/rotina/{newRotinaResult.Id}", newRotinaResult);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(e.Message);
        }
    }

    private static async Task<IResult> UpdateRotinaById(int id, UpdateRotinaDTO updateDto, MyDbContext context)
    {
        try
        {
            var affectedRows = await context.Rotinas
                .Where(r => r.Id == id)
                .ExecuteUpdateAsync(sets => sets
                    .SetProperty(r => r.Nome, updateDto.Nome)
                    .SetProperty(r => r.Descricao, updateDto.Descricao)
                );

            return affectedRows == 0 ? Results.NotFound("Rotina não encontrada") : Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(e.Message);
        }
    }
    
    private static async Task<IResult> DeleteRotina(int id, MyDbContext context)
    {
        try
        {
            var rotina = await context.Rotinas.FindAsync(id);
            if (rotina is null) return Results.NotFound();

            context.Rotinas.Remove(rotina);
            await context.SaveChangesAsync();
            return Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Erro ao deletar rotina: {e.Message}");
            return Results.Problem("Erro ao deletar rotina.", statusCode: StatusCodes.Status500InternalServerError);
        }
    }
}