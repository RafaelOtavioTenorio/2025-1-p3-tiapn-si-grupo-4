## Arquivo .sql

Adicione aqui os scripts SQL.

```sql
-- Habilitar a extensão UUID (se necessário, alguns bancos de dados já têm isso habilitado)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela para armazenar informações dos usuários
CREATE TABLE Usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- UUID gerado automaticamente
    username VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE
    -- Outros campos relevantes para o usuário podem ser adicionados aqui
);

-- Tabela para armazenar informações das organizações
CREATE TABLE Organizacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- UUID gerado automaticamente
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Outros campos relevantes para a organização podem ser adicionados aqui
);

-- Tabela de junção para relacionar usuários e organizações (muitos-para-muitos)
CREATE TABLE Usuario_Organizacao (
    usuario_id UUID,
    organizacao_id UUID,
    funcao VARCHAR(255),
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, organizacao_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (organizacao_id) REFERENCES Organizacoes(id)
);

-- Tabela para Quadros (Boards)
CREATE TABLE Quadros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizacao_id UUID, -- Chave estrangeira para a organização
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizacao_id) REFERENCES Organizacoes(id)
);

-- Tabela para Listas
CREATE TABLE Listas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quadro_id UUID,       -- Chave estrangeira para o quadro
    nome VARCHAR(255) NOT NULL,
    posicao INT,         -- Ordem da lista no quadro
    FOREIGN KEY (quadro_id) REFERENCES Quadros(id)
);

-- Tabela para Cartões (Cards)
CREATE TABLE Cartoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lista_id UUID,        -- Chave estrangeira para a lista
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    posicao INT,         -- Ordem do cartão na lista
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_vencimento TIMESTAMP, -- Opcional: data de entrega
    FOREIGN KEY (lista_id) REFERENCES Listas(id)
);

-- Tabela de junção para Atribuições de Cartões a Usuários
CREATE TABLE Atribuicoes_Cartoes (
    cartao_id UUID,
    usuario_id UUID,
    data_atribuicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cartao_id, usuario_id),
    FOREIGN KEY (cartao_id) REFERENCES Cartoes(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);
```