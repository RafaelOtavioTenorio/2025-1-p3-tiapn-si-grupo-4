# EF Core Migration Commands Documentation

This document outlines the sequence of commands executed to set up and apply Entity Framework Core (EF Core) migrations for a .NET application using a MySQL database (`routix`). The commands resolve the error `Table 'routix.logs' doesn't exist` by installing the necessary tools, creating migrations, and applying them to the database to create the `Logs` table based on the `LogModel` entity.

## Purpose
The commands enable the creation and application of database migrations to synchronize the database schema with the application's data model, specifically creating the `Logs` table for the `LogModel` entity in the `routix` database.

## Prerequisites
- **Project Setup**: A .NET project with the following EF Core packages in the `.csproj` file:
  ```xml
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />
  </ItemGroup>
  ```
- **Database**: A MySQL database named `routix` with a user (`routix`) and password (`123456789`) configured with appropriate permissions. Create the database if it doesn't exist:
  ```sql
  CREATE DATABASE routix;
  GRANT ALL PRIVILEGES ON routix.* TO 'routix'@'%' IDENTIFIED BY '123456789';
  FLUSH PRIVILEGES;
  ```
- **DbContext**: A `MyDbContext` class configured with a connection string in `OnConfiguring`:
  ```csharp
  var connectionString = $"Server=localhost;Port=3306;Database=routix;User Id=routix;Password=123456789;";
  optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 21)));
  ```
- **Environment**: Commands are executed in the project directory:
  ```
  C:\Users\Joao-Santos\Desktop\2025-1-p3-tiapn-si-grupo-4\src\back
  ```

## Commands in Order of Execution

1. **Initial Attempt: Create Migration**
   - **Command**:
     ```bash
     dotnet ef migrations add InitialMigration
     ```
   - **Purpose**: Attempts to create a new migration named `InitialMigration` to define the database schema for the `LogModel` entity (e.g., creating the `Logs` table).
   - **Outcome**: Failed with the error:
     ```
     Não foi possível executar porque o comando ou arquivo especificado não foi encontrado.
     ```
     The error occurred because the `dotnet-ef` tool was not installed.
   - **Context**: This step highlighted the need to install the EF Core CLI tools to enable migration commands.

2. **Install EF Core CLI Tool**
   - **Command**:
     ```bash
     dotnet tool install --global dotnet-ef
     ```
   - **Purpose**: Installs the `dotnet-ef` tool globally to enable EF Core CLI commands like `migrations add` and `database update`.
   - **Outcome**: Successfully installed version `9.0.5`:
     ```
     Você pode invocar a ferramenta usando o comando a seguir: dotnet-ef
     A ferramenta 'dotnet-ef' (versão '9.0.5') foi instalada com êxito.
     ```
   - **Context**: This resolved the "command not found" error, allowing subsequent EF Core commands to execute.

3. **Create Migration: `InitialMigration`**
   - **Command**:
     ```bash
     dotnet ef migrations add InitialMigration
     ```
   - **Purpose**: Generates migration files in the `Migrations` folder to create the `Logs` table based on the `LogModel` entity.
   - **Outcome**: Successfully created the migration:
     ```
     Build started...
     Build succeeded.
     Connection String: Server=localhost;Port=3306;Database=routix;User Id=routix;Password=123456789;
     Done. To undo this action, use 'ef migrations remove'
     ```
   - **Context**: Created the migration `20250521224509_InitialMigration`, defining the schema for the `Logs` table. The logged connection string confirmed the use of the `routix` user.

4. **Create Another Migration: `InitialCreate`**
   - **Command**:
     ```bash
     dotnet ef migrations add InitialCreate
     ```
   - **Purpose**: Attempts to create another migration named `InitialCreate`.
   - **Outcome**: Successfully created the migration:
     ```
     Build started...
     Build succeeded.
     Connection String: Server=localhost;Port=3306;Database=routix;User Id=routix;Password=123456789;
     Done. To undo this action, use 'ef migrations remove'
     ```
   - **Context**: Created a second migration (`20250521224829_InitialCreate`). If no model changes were made since `InitialMigration`, this migration may be empty or redundant. It can be removed if unnecessary:
     ```bash
     dotnet ef migrations remove
     ```

5. **Apply Migrations**
   - **Command**:
     ```bash
     dotnet ef database update
     ```
   - **Purpose**: Applies all pending migrations (`InitialMigration` and `InitialCreate`) to the `routix` database, creating the `Logs` table and the `__EFMigrationsHistory` table to track applied migrations.
   - **Outcome**: Successfully applied migrations:
     ```
     Build started...
     Build succeeded.
     Connection String: Server=localhost;Port=3306;Database=routix;User Id=routix;Password=123456789;
     info: Microsoft.EntityFrameworkCore.Database.Command[20101]
           Executed DbCommand (5ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
           SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='routix' AND TABLE_NAME='__EFMigrationsHistory';
     info: Microsoft.EntityFrameworkCore.Database.Command[20101]
           Executed DbCommand (50ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
           CREATE TABLE `__EFMigrationsHistory` ...
     ...
     info: Microsoft.EntityFrameworkCore.Migrations[20402]
           Applying migration '20250521224509_InitialMigration'.
     info: Microsoft.EntityFrameworkCore.Database.Command[20101]
           Executed DbCommand (45ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
           CREATE TABLE `Logs` (
               `Id` int NOT NULL AUTO_INCREMENT,
               `DataHora` datetime(6) NOT NULL,
               `Tabela` longtext CHARACTER SET utf8mb4 NOT NULL,
               `Operacao` int NOT NULL,
               `ValorAnterior` longtext CHARACTER SET utf8mb4 NOT NULL,
               `ValorPosterior` longtext CHARACTER SET utf8mb4 NOT NULL,
               CONSTRAINT `PK_Logs` PRIMARY KEY (`Id`)
           ) CHARACTER SET=utf8mb4;
     ...
     info: Microsoft.EntityFrameworkCore.Migrations[20402]
           Applying migration '20250521224829_InitialCreate'.
     ...
     Done.
     ```
   - **Context**: Created the `Logs` table, resolving the `Table 'routix.logs' doesn't exist` error. The `__EFMigrationsHistory` table tracks applied migrations.

6. **Run Application**
   - **Command**:
     ```bash
     dotnet run
     ```
   - **Purpose**: Starts the .NET application, which queries the `Logs` table via the `LogsController.GetAllLogs` method.
   - **Outcome**: Application ran successfully without the table error:
     ```
     Compilando...
     info: Microsoft.Hosting.Lifetime[14]
           Now listening on: http://localhost:3000
     info: Microsoft.Hosting.Lifetime[0]
           Application started. Press Ctrl+C to shut down.
     Connection String: Server=localhost;Port=3306;Database=routix;User Id=routix;Password=123456789;
     info: Microsoft.EntityFrameworkCore.Database.Command[20101]
           Executed DbCommand (10ms) [Parameters=[], CommandType='Text', CommandTimeout='30']
           SELECT `l`.`Id`, `l`.`DataHora`, `l`.`Operacao`, `l`.`Tabela`, `l`.`ValorAnterior`, `l`.`ValorPosterior`
           FROM `Logs` AS `l`
     ```
   - **Context**: The successful query confirmed that the `Logs` table exists and the application can access it.

## Notes
- **Error Resolution**: The initial `Table 'routix.logs' doesn't exist` error was resolved by applying migrations with `dotnet ef database update`. The `Access denied for user 'root'@'172.20.0.1'` error from earlier was fixed by using the `routix` user in the connection string.
- **Redundant Migration**: The `InitialCreate` migration may be empty if no model changes were made. Check the `Migrations` folder and remove it if unnecessary:
  ```bash
  dotnet ef migrations remove
  ```
- **Security**: The password `123456789` for the `routix` user is weak. For production, use a stronger password and update the `.env` file or `MyDbContext` defaults:
  ```csharp
  var password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "secure_password";
  ```
- **Docker**: If MySQL is running in a Docker container, ensure `DATABASE_HOST` is set to the container name (e.g., `mysql`) and both containers are on the same network:
  ```bash
  docker network create app-network
  docker run --network app-network --name mysql -e MYSQL_ROOT_PASSWORD=123456789 -d mysql:8.0.21
  ```

## Verification
To confirm the schema:
```sql
mysql -h localhost -u routix -p123456789 -D routix
SHOW TABLES;
DESCRIBE Logs;
```
Expected `Logs` table structure:
```
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| Id             | int          | NO   | PRI | NULL    | auto_increment |
| DataHora       | datetime(6)  | NO   |     | NULL    |                |
| Tabela         | longtext     | NO   |     | NULL    |                |
| Operacao       | int          | NO   |     | NULL    |                |
| ValorAnterior  | longtext     | NO   |     | NULL    |                |
| ValorPosterior | longtext     | NO   |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+
```