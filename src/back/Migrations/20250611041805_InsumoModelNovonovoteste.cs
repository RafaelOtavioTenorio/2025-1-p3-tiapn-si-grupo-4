using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class InsumoModelNovonovoteste : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Insumos_TAREFAS_TarefaModelID",
                table: "Insumos");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Insumos",
                table: "Insumos");

            migrationBuilder.RenameTable(
                name: "Insumos",
                newName: "INSUMOS",
                newSchema: "dbo");

            migrationBuilder.RenameColumn(
                name: "TarefaModelID",
                schema: "dbo",
                table: "INSUMOS",
                newName: "TarefaTemplateModelID");

            migrationBuilder.RenameIndex(
                name: "IX_Insumos_TarefaModelID",
                schema: "dbo",
                table: "INSUMOS",
                newName: "IX_INSUMOS_TarefaTemplateModelID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_INSUMOS",
                schema: "dbo",
                table: "INSUMOS",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_INSUMOS_TAREFA_TEMPLATES_TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS",
                column: "TarefaTemplateModelID",
                principalSchema: "dbo",
                principalTable: "TAREFA_TEMPLATES",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_INSUMOS_TAREFA_TEMPLATES_TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_INSUMOS",
                schema: "dbo",
                table: "INSUMOS");

            migrationBuilder.RenameTable(
                name: "INSUMOS",
                schema: "dbo",
                newName: "Insumos");

            migrationBuilder.RenameColumn(
                name: "TarefaTemplateModelID",
                table: "Insumos",
                newName: "TarefaModelID");

            migrationBuilder.RenameIndex(
                name: "IX_INSUMOS_TarefaTemplateModelID",
                table: "Insumos",
                newName: "IX_Insumos_TarefaModelID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Insumos",
                table: "Insumos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Insumos_TAREFAS_TarefaModelID",
                table: "Insumos",
                column: "TarefaModelID",
                principalSchema: "dbo",
                principalTable: "TAREFAS",
                principalColumn: "ID");
        }
    }
}
