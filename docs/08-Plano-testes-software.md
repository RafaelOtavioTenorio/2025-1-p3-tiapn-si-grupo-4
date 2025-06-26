# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="02-Especificacao.md">Especificação do projeto</a>.

Por exemplo:

| **Caso de teste**  | **CT-001 – Cadastrar usuário na plataforma**  |
|:---: |:---: |
| Requisito associado | RF-001 - Permitir que o usuário se cadastre na plataforma. |
| Objetivo do teste | Verificar se o usuário consegue realizar seu cadastro na plataforma. |
| Passos | - Acessar o sistema pela URL definida <br> - Clicar em “Cadastrar” ou “Criar Conta” <br> - Preencher os campos obrigatórios (nome, CPF, RG, data de nascimento, e-mail, senha etc.) <br> - Confirmar o cadastro |
| Critério de êxito | - O cadastro é finalizado com sucesso e o sistema redireciona o usuário para a tela de login ou dashboard. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |              

<br>

| **Caso de teste**  | **CT-002 – Realizar login na plataforma**  |
|:---: |:---: |
| Requisito associado | RF-002 - Permitir que o usuário faça login na plataforma. |
| Objetivo do teste | Verificar se o usuário consegue efetuar login após se cadastrar. |
| Passos | - Acessar a tela de login <br> - Preencher os campos de CPF ou e-mail e senha <br> - Clicar em “Entrar” |
| Critério de êxito | - O sistema autentica o usuário e redireciona para o painel da plataforma. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-003 – Cadastrar rotina ou processo**  |
|:---: |:---: |
| Requisito associado | RF-003 - Os usuários podem cadastrar uma rotina ou processo. |
| Objetivo do teste | Verificar se é possível criar uma nova rotina ou processo no sistema. |
| Passos | - Acessar a dashboard <br> - Selecionar a opção “Nova rotina” ou “Novo processo” <br> - Preencher os campos obrigatórios (nome, descrição etc.) <br> - Confirmar o cadastro |
| Critério de êxito | - A rotina ou processo é exibido na lista de rotinas/processos do usuário. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-004 – Iniciar uma rotina cadastrada**  |
|:---: |:---: |
| Requisito associado | RF-006 - Iniciar uma rotina ou processo cadastrado. |
| Objetivo do teste | Validar se o usuário consegue iniciar a execução de uma rotina. |
| Passos | - Acessar a lista de rotinas <br> - Selecionar uma rotina cadastrada <br> - Clicar em “Iniciar” ou equivalente |
| Critério de êxito | - A rotina passa para o status “Em andamento” e é exibida na área de rotinas em execução. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-005 – Adicionar tarefa à rotina em andamento**  |
|:---: |:---: |
| Requisito associado | RF-011 - Alterar, Adicionar e Remover uma tarefa de uma rotina ou processo em andamento. |
| Objetivo do teste | Verificar se o usuário consegue adicionar uma nova tarefa a uma rotina em execução. |
| Passos | - Acessar a rotina em execução <br> - Clicar em “Adicionar tarefa” <br> - Preencher os dados da tarefa <br> - Salvar |
| Critério de êxito | - A tarefa é inserida na rotina e exibida corretamente na interface. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |
















