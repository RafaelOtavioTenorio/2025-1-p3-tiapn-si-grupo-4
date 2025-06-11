using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class InsumoModelNovonovoteste456 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_INSUMOS_TAREFA_TEMPLATES_TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS");

            migrationBuilder.DropIndex(
                name: "IX_INSUMOS_TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS");

            migrationBuilder.DropColumn(
                name: "TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_INSUMOS_TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS",
                column: "TarefaTemplateModelID");

            migrationBuilder.AddForeignKey(
                name: "FK_INSUMOS_TAREFA_TEMPLATES_TarefaTemplateModelID",
                schema: "dbo",
                table: "INSUMOS",
                column: "TarefaTemplateModelID",
                principalSchema: "dbo",
                principalTable: "TAREFA_TEMPLATES",
                principalColumn: "ID");
        }
    }
}
