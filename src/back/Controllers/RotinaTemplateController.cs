using back.DTOs;
using back.Entities;
using back.Models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

public static class RotinaTemplateController
{
    public static void RotinaTemplateRoutes(this WebApplication app)
    {
        var routes = app.MapGroup("RotinaTemplate");
        
        routes.MapGet("", FindAllRotinaTemplates);
        
        routes.MapGet("{id:int}", FindRotinaTemplateById);
        
        routes.MapPost("", CreateRotinaTemplate);
        
        routes.MapPut("{id:int}", UpdateRotinaTemplateById);
    }
    
    private static async Task<IResult> FindAllRotinaTemplates (MyDbContext context)
    {
        try
        {
            var templates = await context.RotinaTemplates
                .Include(t => t.Empresa)
                .Include(t => t.TarefasTemplates)
                .Select(t => new RotinaTemplateDTO
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    Empresa = new EmpresaDTO
                    {
                        ID = t.Empresa.ID,
                        Nome = t.Empresa.Nome,
                        CNPJ = t.Empresa.CNPJ
                    },
                    Prioridade = t.Prioridade,
                    Descricao = t.Descricao,
                    TarefasTemplates = t.TarefasTemplates.Select(tarefa => new TarefaTemplateOnRotinaDTO
                    {
                        Id = tarefa.ID,
                        Nome = tarefa.Nome,
                        Pai = tarefa.Pai,
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
    
    private static async Task<IResult> FindRotinaTemplateById (int id, MyDbContext context)
    {
        try
        {
            var template = await context.RotinaTemplates.Include(t => t.Empresa)
                .Include(t => t.TarefasTemplates)
                .Select(t => new RotinaTemplateDTO
                {
                    Id = t.Id,
                    Nome = t.Nome,
                    Empresa = new EmpresaDTO
                    {
                        ID = t.Empresa.ID,
                        Nome = t.Empresa.Nome,
                        CNPJ = t.Empresa.CNPJ
                    },
                    Prioridade = t.Prioridade,
                    Descricao = t.Descricao,
                    TarefasTemplates = t.TarefasTemplates.Select(tarefa => new TarefaTemplateOnRotinaDTO
                    {
                        Id = tarefa.ID,
                        Nome = tarefa.Nome,
                        Pai = tarefa.Pai,
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
    
    private static async Task<IResult> CreateRotinaTemplate (RotinaTemplateCreateDto createDto, MyDbContext context)
    {
        try
        {
            var empresaRef = await context.Empresas.FindAsync(createDto.IdEmpresa);
            if (empresaRef is null)
                return Results.NotFound("Empresa não encontrada");
            var newRotinaTemplate = new RotinaTemplateModel
            {
                Nome = createDto.Nome,
                Ativo = true,
                Descricao = createDto.Descricao,
                Empresa = empresaRef,
                Prioridade = createDto.Prioridade
            };
            await context.RotinaTemplates.AddAsync(newRotinaTemplate);
            return Results.Created();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(e.Message);
        }
    }
    
    private static async Task<IResult> UpdateRotinaTemplateById (int id, UpdateRotinaTemplateDTO dtOs, MyDbContext context)
    {
        try
        {
            var affectedRows = await context.RotinaTemplates
                .Where(r => r.Id == id)
                .ExecuteUpdateAsync(sets => sets
                    .SetProperty(r => r.Nome, dtOs.Nome)
                    .SetProperty(r => r.Descricao, dtOs.Descricao)
                    .SetProperty(r => r.Prioridade, dtOs.Prioridade)
                );

            return affectedRows == 0 ? Results.NotFound("Rotina não encontrada") : Results.NoContent();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Results.Problem(e.Message);
        }
    }
}