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

| **Caso de teste**  | **CT-006 – Adicionar sub-rotinas a uma rotina**  |
|:---: |:---: |
| Requisito associado | RF-005 - Alterar, Adicionar e Remover sub-rotinas/sub-processos a sua rotina ou processo. |
| Objetivo do teste | Verificar se sub-rotinas podem ser gerenciadas dentro de uma rotina. |
| Passos | - Acessar rotina <br> - Clicar em “Adicionar sub-rotina” <br> - Preencher dados e salvar |
| Critério de êxito | - Sub-rotina visível e associada corretamente à rotina principal. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-007 – Iniciar rotina cadastrada**  |
|:---: |:---: |
| Requisito associado | RF-006 - Iniciar uma rotina ou processo cadastrado. |
| Objetivo do teste | Validar se o usuário consegue iniciar uma rotina existente. |
| Passos | - Acessar lista de rotinas <br> - Clicar em “Iniciar” na rotina desejada |
| Critério de êxito | - Status da rotina altera para “Em andamento”. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-008 – Comentar tarefas e sub-rotinas**  |
|:---: |:---: |
| Requisito associado | RF-008 - Adicionar comentários às tarefas e sub-rotinas/sub-processos. |
| Objetivo do teste | Verificar se é possível comentar em tarefas ou sub-processos. |
| Passos | - Acessar tarefa ou sub-rotina <br> - Digitar comentário <br> - Enviar |
| Critério de êxito | - Comentário salvo e exibido corretamente. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-009 – Visualizar histórico de rotina em andamento**  |
|:---: |:---: |
| Requisito associado | RF-009 - Visualizar o histórico de uma rotina ou processo em andamento. |
| Objetivo do teste | Confirmar se o sistema exibe corretamente as alterações realizadas em rotinas ativas. |
| Passos | - Acessar rotina ativa <br> - Abrir aba ou botão de histórico |
| Critério de êxito | - Histórico mostra modificações com data, hora e responsável. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-010 – Visualizar histórico de rotinas finalizadas**  |
|:---: |:---: |
| Requisito associado | RF-010 - Visualizar o histórico de rotinas e processos finalizados. |
| Objetivo do teste | Verificar se o histórico permanece disponível após a finalização. |
| Passos | - Acessar rotina finalizada <br> - Clicar em “Histórico” |
| Critério de êxito | - Histórico exibido de forma íntegra. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |

<br>

| **Caso de teste**  | **CT-011 – Relatório de tempo de execução**  |
|:---: |:---: |
| Requisito associado | RF-020 - Gerar relatório de tempo. |
| Objetivo do teste | Verificar se o relatório de tempo da rotina é gerado corretamente. |
| Passos | - Acessar rotina concluída <br> - Clicar em “Gerar Relatório de Tempo” |
| Critério de êxito | - Relatório é exibido com tempos parciais e totais corretamente. |
| Responsável pela elaboração do caso de teste | Nome do integrante da equipe. |












