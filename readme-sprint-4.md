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
   - Baixe e instale o NodeJS a partir do [site oficial](https://nodejs.org/)
   - Verifique a instalação executando:
     ```bash
     node --version
     npm --version
     ```
   

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
   - Acesse a página inicial do sistema
   - Clique no botão "Registrar" no canto superior direito
   - Preencha o formulário com:
     - Nome completo
     - Email válido
     - Senha (mínimo 8 caracteres)
     - Confirmação de senha
   - Clique em "Criar Conta"
   - Aguarde a confirmação de cadastro

2. **Fazer Login**:
   - Na página inicial, clique em "Entrar"
   - Digite seu email cadastrado
   - Digite sua senha
   - Clique em "Login"
   - Após autenticação bem sucedida, você será redirecionado para a página principal

3. **Navegação**:
   - No painel lateral esquerdo (sidepanel) você encontrará:
     - Dashboard: Visão geral das suas atividades
     - Tarefas: Gerenciamento de tarefas individuais
     - Rotinas: Criação e visualização de rotinas
     - Templates: Modelos pré-definidos de tarefas
     - Configurações: Ajustes da conta
   - Clique em cada item para acessar a respectiva funcionalidade
   - O cabeçalho superior mostra seu nome de usuário e notificações

4. **Logout**:
   - No painel lateral, role até o final
   - Localize o botão "Sair" com ícone de logout
   - Clique no botão para encerrar sua sessão
   - Você será redirecionado para a página inicial
   - Suas credenciais serão removidas do navegador por segurança