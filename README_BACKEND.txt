# Instruções para Executar o Backend e Frontend

## Instalação de Dependências

1. **Instalar o .NET SDK**:
   - Baixe e instale o .NET SDK a partir do [site oficial](https://dotnet.microsoft.com/download).

2. **Instalar o Entity Framework Core**:
   - Execute o seguinte comando para instalar o Entity Framework Core:
     ```bash
     dotnet tool install --global dotnet-ef
     ```

3. **Instalar Dependências do Projeto**:
   - Navegue até a pasta do backend:
     ```bash
     cd src/back
     ```
   - Restaure as dependências do projeto:
     ```bash
     dotnet restore
     ```
2. Instalar o nodeJS

## Backend

1. **Configuração do Banco de Dados**:
   - **Opção 1**: Criar um banco MySQL na porta 3306.
   - **Opção 2**: Rodar o banco de dados usando Docker:
     ```bash
     docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=your_password -p 3306:3306 -d mysql:latest
     ```

2. **Executar as Migrations**:
   - Navegue até a pasta do backend:
     ```bash
     cd src/back
     ```
   - Execute o comando para atualizar o banco de dados:
     ```bash
     dotnet ef database update
     ```

3. **Rodar o Swagger**:
   - Inicie o backend:
     ```bash
     dotnet run
     ```
   - Acesse o Swagger em: `http://localhost:3000/swagger`

## Frontend

1. **Iniciar o Frontend**:
   - Navegue até a pasta do frontend:
     ```bash
     cd front
     ```

   - Instale as dependencias 
   ```bash
   npm install
   ```

   - Execute o comando para iniciar o servidor de desenvolvimento:
     ```bash
     npm run dev
     ```

## Fluxo de Autenticação e Navegação

1. **Criar uma Conta**:
   - Acesse a página de registro e crie uma nova conta.

2. **Fazer Login**:
   - Use as credenciais criadas para fazer login.

3. **Navegação**:
   - Utilize os botões do sidepanel para navegar entre as páginas.

4. **Logout**:
   - Clique no botão de logout no sidepanel para sair da sessão. 