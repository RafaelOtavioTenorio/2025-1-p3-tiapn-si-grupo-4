using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class TarefaModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdTarefa",
                schema: "dbo",
                table: "TAREFAS",
                newName: "TarefaID");

            migrationBuilder.CreateIndex(
                name: "IX_TAREFAS_TarefaID",
                schema: "dbo",
                table: "TAREFAS",
                column: "TarefaID");

            migrationBuilder.AddForeignKey(
                name: "FK_TAREFAS_TAREFAS_TarefaID",
                schema: "dbo",
                table: "TAREFAS",
                column: "TarefaID",
                principalSchema: "dbo",
                principalTable: "TAREFAS",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TAREFAS_TAREFAS_TarefaID",
                schema: "dbo",
                table: "TAREFAS");

            migrationBuilder.DropIndex(
                name: "IX_TAREFAS_TarefaID",
                schema: "dbo",
                table: "TAREFAS");

            migrationBuilder.RenameColumn(
                name: "TarefaID",
                schema: "dbo",
                table: "TAREFAS",
                newName: "IdTarefa");
        }
    }
}
