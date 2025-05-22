using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back.Migrations
{
    /// <inheritdoc />
    public partial class TableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Logs",
                table: "Logs");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "USERS",
                newSchema: "dbo");

            migrationBuilder.RenameTable(
                name: "Logs",
                newName: "LOGS",
                newSchema: "dbo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_USERS",
                schema: "dbo",
                table: "USERS",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LOGS",
                schema: "dbo",
                table: "LOGS",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_USERS",
                schema: "dbo",
                table: "USERS");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LOGS",
                schema: "dbo",
                table: "LOGS");

            migrationBuilder.RenameTable(
                name: "USERS",
                schema: "dbo",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "LOGS",
                schema: "dbo",
                newName: "Logs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Logs",
                table: "Logs",
                column: "Id");
        }
    }
}
