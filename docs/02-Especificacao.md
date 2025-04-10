# Especificação do projeto

As personas representam perfis fictícios baseados em usuários reais que podem interagir com a aplicação. Elas são elaboradas para entender melhor as necessidades, desafios e objetivos do público-alvo, auxiliando no desenvolvimento de soluções mais eficazes e alinhadas com a realidade dos usuários.

## Personas

1. Paula – Gestora de Produção

    Idade: 42 anos

    Ocupação: Coordenadora de produção em uma indústria têxtil

    Contexto: Paula coordena uma equipe de 30 operadores e precisa garantir que todas as rotinas de produção ocorram no prazo e sem erros.
   
 2. Lucas – Técnico de Manutenção

    Idade: 28 anos

    Ocupação: Técnico de manutenção em uma fábrica de alimentos

    Contexto: Lucas executa manutenções programadas e precisa seguir checklists rigorosos. Ele reclama que perde tempo buscando insumos no almoxarifado.

3. Fernanda – Analista de Qualidade

    Idade: 35 anos

    Ocupação: Responsável por auditorias e controle de qualidade

    Contexto: Fernanda precisa garantir que todas as etapas das rotinas estejam sendo seguidas e documentadas corretamente para fins de certificação.

4. Bruno – Gerente de TI

    Idade: 39 anos

    Ocupação: Gerente de tecnologia de uma empresa de logística

    Contexto: Bruno quer automatizar tarefas repetitivas e padronizar processos da equipe técnica com rotinas digitais.

5. Camila – Assistente Administrativa

    Idade: 25 anos

    Ocupação: Auxiliar administrativa em escritório de engenharia

    Contexto: Camila organiza a rotina de pagamentos, agendamento de reuniões e controle de insumos para o escritório, mas não tem uma ferramenta centralizada.

6. Rafael – Diretor de Operações

    Idade: 50 anos

    Ocupação: Diretor de operações em uma rede de franquias

    Contexto: Rafael quer acompanhar, de forma macro, a execução das rotinas nas unidades franqueadas e verificar onde há gargalos.
7. Tatiane – Consultora de Processos

    Idade: 46 anos

    Ocupação: Consultora externa de melhoria de processos

    Contexto: Tatiane presta serviço de auditoria e melhoria de processos em diversas empresas. Ela frequentemente mapeia fluxos em ferramentas como BPMN e precisa de uma solução que permita não apenas documentar, mas testar e acompanhar esses fluxos em tempo real nas empresas-clientes.

 8. Igor – Estagiário de Engenharia

    Idade: 21 anos

    Ocupação: Estagiário de engenharia em uma metalúrgica

    Contexto: Igor está aprendendo sobre processos internos e é constantemente encarregado de tarefas simples dentro de rotinas maiores. Ele precisa de clareza sobre o que deve fazer, prazos e como cada passo se encaixa no todo.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO |PRECISO |PARA |
|--------------------|-------------------------------------|----------------------------------------|
|Gestora de Produção|criar e acompanhar rotinas de produção com subtarefas e insumos|garantir que minha equipe siga os procedimentos corretamente e não falte materiais.|
|Técnico de manutenção|ter acesso às rotinas com seus passos e insumos listados|não atrasar a execução das tarefas e garantir que tudo esteja disponível quando eu começar|
|Analista de Qualidade|acessar o histórico das execuções de rotinas|aprofundar meus conhecimentos na área de endocrinologia e suas complexidades|
|Gerente de TI|cadastrar rotinas com frequência definida (diária, semanal, etc.)|validar se os processos foram cumpridos conforme o padrão e gerar relatórios para auditoria|
|Assistente administrativa|acompanhar várias instâncias da mesma rotina (como “fechamento financeiro mensal”)|manter tudo organizado e saber o que já foi feito em cada mês|
|Diretor de operações|visualizar o status das rotinas em andamento com filtros por responsáveis e categorias|identificar problemas operacionais rapidamente e agir de forma estratégica|
|Consultora de processos|modelar rotinas como templates reutilizáveis e acompanhar sua execução|aplicar melhorias e padronizações nas empresas onde atuo com base em dados reais|
|Estagiário de engenharia| visualizar apenas os passos e tarefas que me foram atribuídos dentro das rotinas|executar corretamente minhas atividades sem confusão, mesmo sem experiência prévia|


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID      | Descrição do Requisito | Prioridade |
|---------|------------------------|------------|
| RF-001  | Permitir que o usuário se cadastre no sistema| ALTA |
| RF-002  | Permitir que o usuário faça login na plataforma | ALTA |
| RF-003  | Permitir o cadastro de rotinas com nome, descrição, frequência e categorias | ALTA |
| RF-004  | Permitir a instanciação de múltiplas execuções de uma mesma rotina | ALTA |
| RF-005  | Permitir a criação e organização de passos/subrotinas dentro de uma rotina | ALTA |
| RF-006  | Permitir que cada passo tenha checklists e status individual (pendente, em andamento, concluído) | MÉDIA |
| RF-007  | Associar insumos a passos e verificar sua disponibilidade em estoque | BAIXA |
| RF-008  | Permitir solicitação de insumos automaticamente ao setor responsável quando não houver disponibilidade | BAIXA |
| RF-009  | Visualizar rotinas em execução com filtros por responsável, status, tipo e datas| BAIXA |
| RF-010  | Gerar histórico de execuções e relatórios de tempo e insumos utilizados | MÉDIA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve estar disponível 24 horas por dia | ALTA |
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA |
|RNF-003| O sistema deve armazenar dados do usuário | ALTA |
|RNF-004| O sistema deve exibir o conteúdo com base nas permissões e papéis dos usuários | ALTA |
|RNF-005| O sistema deve ser responsivo e funcionar em dispositivos móveis e desktops | ALTA |

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido       |

## Diagrama de casos de uso

![image](../docs/images/Routix.drawio(5).png)

