using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class AutoMigration_001 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Ativo",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                type: "tinyint(1)",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldDefaultValue: true);

            migrationBuilder.CreateIndex(
                name: "IX_TAREFA_TEMPLATES_Pai",
                schema: "dbo",
                table: "TAREFA_TEMPLATES",
                column: "Pai");

            migrationBuilder.AddForeignKey(
                name: "FK_TAREFA_TEMPLATES_TAREFA_TEMPLATES_Pai",
                schema: "dbo",
                table: "TAREFA_TEMPLATES",
                column: "Pai",
                principalSchema: "dbo",
                principalTable: "TAREFA_TEMPLATES",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TAREFA_TEMPLATES_TAREFA_TEMPLATES_Pai",
                schema: "dbo",
                table: "TAREFA_TEMPLATES");

            migrationBuilder.DropIndex(
                name: "IX_TAREFA_TEMPLATES_Pai",
                schema: "dbo",
                table: "TAREFA_TEMPLATES");

            migrationBuilder.AlterColumn<bool>(
                name: "Ativo",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: true,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");
        }
    }
}
