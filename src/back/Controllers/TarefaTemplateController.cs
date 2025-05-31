// back\Controllers\TarefaController.cs
using back.DTOs;
using back.Models; // Certifique-se de que esta linha está presente para TarefaModel
using Microsoft.EntityFrameworkCore;
using System;
using back.Entities; // Adicione esta linha para MyDbContext

namespace back.Controllers
{
    public static class TarefaController
    {
        public static void TarefaRoutes(this WebApplication app)
        {
            var route = app.MapGroup("tarefa");

            route.MapGet("", GetAllTarefas);

            route.MapGet("{id:int}", GetTarefaById);

            route.MapPost("", CreateTarefa);

            route.MapPut("{id:int}", UpdateTarefa);

            route.MapDelete("{id:int}", DeleteTarefa);
        }

        private static async Task<IResult> GetAllTarefas(MyDbContext context)
        {
            try
            {
                var tarefas = await context.Tarefa.ToListAsync();
                return Results.Ok(tarefas);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao buscar tarefas: {e.Message}");
                return Results.Problem("Ocorreu um erro ao buscar as tarefas.");
            }
        }

        private static async Task<IResult> GetTarefaById(int id, MyDbContext context)
        {
            try
            {
                var tarefa = await context.Tarefa.FindAsync(id);
                if (tarefa == null)
                    return Results.NotFound($"Tarefa com ID {id} não encontrada.");

                return Results.Ok(tarefa);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao buscar tarefa por ID: {e.Message}");
                return Results.Problem($"Ocorreu um erro ao buscar a tarefa com ID {id}.");
            }
        }

        private static async Task<IResult> CreateTarefa(TarefaDTO req, MyDbContext context)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(req.Nome) || string.IsNullOrWhiteSpace(req.Descricao) || !req.IdTarefa.HasValue)
                {
                    return Results.BadRequest("Nome, Descrição e IdTarefa são obrigatórios para criar uma Tarefa.");
                }

                var tarefa = new TarefaModel
                {
                    IdTarefa = req.IdTarefa.Value,
                    Nome = req.Nome,
                    Descricao = req.Descricao,
                    FoiExecutada = req.FoiExecutada ?? false,
                    DataInicio = req.DataInicio,
                    DataFim = req.DataFim
                };

                await context.AddAsync(tarefa);
                await context.SaveChangesAsync();
                return Results.Created($"/tarefa/{tarefa.Id}", tarefa);
            }
            catch (ArgumentException e)
            {
                return Results.BadRequest(e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao criar tarefa: {e.Message}");
                return Results.Problem("Ocorreu um erro ao criar a tarefa.", statusCode: StatusCodes.Status500InternalServerError);
            }
        }

        private static async Task<IResult> UpdateTarefa(int id, TarefaDTO req, MyDbContext context)
        {
            try
            {
                var tarefa = await context.Tarefa.FindAsync(id);
                if (tarefa == null)
                    return Results.NotFound($"Tarefa com ID {id} não encontrada.");

                if (!string.IsNullOrWhiteSpace(req.Nome))
                {
                    tarefa.UpdateName(req.Nome);
                }
                if (!string.IsNullOrWhiteSpace(req.Descricao))
                {
                    tarefa.UpdateDescricao(req.Descricao);
                }
                if (req.FoiExecutada.HasValue)
                {
                    if (req.FoiExecutada.Value)
                    {
                        tarefa.SetExecutada();
                    }
                    else
                    {
                        tarefa.SetNaoExecutada();
                    }
                }

                if (req.DataInicio.HasValue)
                {
                    tarefa.SetDataInicio(req.DataInicio.Value);
                }
                if (req.DataFim.HasValue)
                {
                    tarefa.SetDataFim(req.DataFim.Value);
                }

                await context.SaveChangesAsync();
                return Results.Ok(tarefa);
            }
            catch (ArgumentException e)
            {
                return Results.BadRequest(e.Message);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao atualizar tarefa: {e.Message}");
                return Results.Problem("Ocorreu um erro ao atualizar a tarefa.");
            }
        }

        private static async Task<IResult> DeleteTarefa(int id, MyDbContext context)
        {
            try
            {
                var tarefa = await context.Tarefa.FindAsync(id);
                if (tarefa == null)
                    return Results.NotFound($"Tarefa com ID {id} não encontrada.");

                context.Tarefa.Remove(tarefa);
                await context.SaveChangesAsync();
                return Results.NoContent();
            }
            catch (Exception e)
            {
                Console.WriteLine($"Erro ao excluir tarefa: {e.Message}");
                return Results.Problem("Ocorreu um erro ao excluir a tarefa.");
            }
        }
    }
}