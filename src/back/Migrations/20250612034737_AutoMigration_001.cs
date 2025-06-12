using System;
using Microsoft.EntityFrameworkCore.Metadata;
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
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "EMPRESAS",
                schema: "dbo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CNPJ = table.Column<string>(type: "varchar(20)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ativo = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EMPRESAS", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LOGS",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DataHora = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Tabela = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Operacao = table.Column<int>(type: "int", nullable: false),
                    ValorAnterior = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ValorPosterior = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LOGS", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TAREFAS",
                schema: "dbo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    TarefaID = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Descricao = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FoiExecutada = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    DataInicio = table.Column<DateTime>(type: "date", nullable: true),
                    DataFim = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TAREFAS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TAREFAS_TAREFAS_TarefaID",
                        column: x => x.TarefaID,
                        principalSchema: "dbo",
                        principalTable: "TAREFAS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "USERS",
                schema: "dbo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CPF = table.Column<string>(type: "varchar(14)", maxLength: 14, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Celular = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NivelAcesso = table.Column<int>(type: "int", nullable: false),
                    Ativo = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USERS", x => x.ID);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TEMPLATE_ROTINAS",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IdEmpresa = table.Column<int>(type: "int", nullable: false),
                    Prioridade = table.Column<int>(type: "int", nullable: false),
                    Descricao = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ativo = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TEMPLATE_ROTINAS", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TEMPLATE_ROTINAS_EMPRESAS_IdEmpresa",
                        column: x => x.IdEmpresa,
                        principalSchema: "dbo",
                        principalTable: "EMPRESAS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LOGIN",
                schema: "dbo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Login = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Senha = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UsuarioID = table.Column<int>(type: "int", nullable: false),
                    Token = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DataLogin = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DataLogout = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LOGIN", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LOGIN_USERS_UsuarioID",
                        column: x => x.UsuarioID,
                        principalSchema: "dbo",
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TAREFA_TEMPLATES",
                schema: "dbo",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IdRotina = table.Column<int>(type: "int", nullable: false),
                    Pai = table.Column<int>(type: "int", nullable: true),
                    Prioridade = table.Column<int>(type: "int", nullable: false),
                    Ativo = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TAREFA_TEMPLATES", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TAREFA_TEMPLATES_TEMPLATE_ROTINAS_IdRotina",
                        column: x => x.IdRotina,
                        principalSchema: "dbo",
                        principalTable: "TEMPLATE_ROTINAS",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_LOGIN_UsuarioID",
                schema: "dbo",
                table: "LOGIN",
                column: "UsuarioID");

            migrationBuilder.CreateIndex(
                name: "IX_TAREFA_TEMPLATES_IdRotina",
                schema: "dbo",
                table: "TAREFA_TEMPLATES",
                column: "IdRotina");

            migrationBuilder.CreateIndex(
                name: "IX_TAREFAS_TarefaID",
                schema: "dbo",
                table: "TAREFAS",
                column: "TarefaID");

            migrationBuilder.CreateIndex(
                name: "idx_template_rotina_nome",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "Nome");

            migrationBuilder.CreateIndex(
                name: "IX_TEMPLATE_ROTINAS_IdEmpresa",
                schema: "dbo",
                table: "TEMPLATE_ROTINAS",
                column: "IdEmpresa");

            migrationBuilder.CreateIndex(
                name: "idx_usuario_cpf",
                schema: "dbo",
                table: "USERS",
                column: "CPF",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_usuario_email",
                schema: "dbo",
                table: "USERS",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "idx_usuario_nome",
                schema: "dbo",
                table: "USERS",
                column: "Nome");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LOGIN",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "LOGS",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TAREFA_TEMPLATES",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TAREFAS",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "USERS",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TEMPLATE_ROTINAS",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EMPRESAS",
                schema: "dbo");
        }
    }
}
