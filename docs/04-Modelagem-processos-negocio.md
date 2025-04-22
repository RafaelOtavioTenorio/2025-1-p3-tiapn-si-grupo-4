# Modelagem dos processos de negócio

## Modelagem da situação atual (Modelagem AS IS)

### Processo 1 - Aluguel de Máquinas:

![image](https://github.com/user-attachments/assets/97971174-d859-4a5d-b74b-2c3707f25dfa)

#### Gargalos encontrados:

- O check-up das máquinas somente é realizado após o recebimento do contrato assinado, criando uma janela para atraso se não estiver tudo ok com as mesmas após confirmação do cliente sobre o aluguel.

- Caso o dividendo seja considerado como risco, não é realizado contato com o cliente. Aumentando a frustração do mesmo e prejudicando a fidelização.

- Somente é realizada reunião sobre o escopo do projeto após recebimento do contrato assinado pelo cliente, diminuindo a flexibilidade administrativa na tomada de decisões.

### Processo 2 - Troca de Peças:

![image](https://github.com/user-attachments/assets/2510bc89-fc11-43f0-a34e-d36ddeea6c9b)

#### Gargalos encontrados:

- Tarefa de buscar peça para troca e informar o administrativo sobre falta da mesma delegada ao mecânico, diminuindo produtividade de mão de obra especializada.

- Mecânico solicita a peça que está em falta, porém não existe um controle proativo de estoque para minimizar futuras ocorrências.

## Descrição geral da proposta (Modelagem TO BE)

### Processo 1 - Aluguel de Máquinas:

![image](https://github.com/user-attachments/assets/c60a333b-daa3-4c52-bddd-6ceb971814bc)

#### Melhorias implementadas:

- Criado fluxo paralelo de verificação das máquinas e rotina administrativa para mais agilidade.

- Incrementado feedback para o cliente informando sobre a decisão de não continuar com a solicitação caso sejam encontrados dividendos e os mesmos sejam considerados de risco.

- Reunião sobre o escopo do projeto foi movida para antes do envio de contrato, possibilitando assim uma melhor tomada de decisões.

### Processo 2 - Troca de Peças:

![image](https://github.com/user-attachments/assets/78e310ab-99cd-4f25-8f89-123b51d30a00)

#### Melhorias implementadas:

- Delegado função de verificar estoque para setor de almoxarifado, liberando o mecânico para outras tarefas enquanto aguarda a compra e entrega da peça.

- Almoxarifado solicita um reestoque da peça em falta ao invés de comprar somente a quantidade necessária, diminuindo a necessidade de diversos contatos com os fornecedores.

- O administrativo transfere a peça comprada para o almoxarifado antes do recebimento do mecânico, facilitando assim o controle de estoque.

Nossa proposta visa diminuir atrasos, remover inconsistências, e otimizar tarefas. Possibilitando assim um maior controle dos processos do negócio.

## Modelagem dos processos

[PROCESSO 1 - Aluguel de máquinas](./processes/processo-1-aluguel-de-maquinas.md "Detalhamento do processo 1.")

[PROCESSO 2 - Troca de peças](./processes/processo-2-troca-de-pecas.md "Detalhamento do processo 2.")

## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de conclusão geral | Avaliar o progresso geral de todas as rotinas | Percentual do progresso geral considerando todas as rotinas | Tabela de rotinas | (Soma do percentual de conclusão de cada rotina ativa / número total de rotinas ativas) *100 |
| Taxa de progreção diaria | Melhorar o entendimento da progreção das tarefas | Mede a % de avanço das tarefas no dia | Tabela de rotinas | (número total de tarefas e sub-rotinas concluidas no dia / quantidade de tarefas e sub-rotinas de rotinas ativas) * 100 |
| Previsão de conclusão | Previsão empirica de conclusão de rotina | Mede impiricamente o tempo restante para conclusão da rotina | Tabela de tarfas | tempo para conclusão das tarefas já concluidas * quantidade total de tarefas / quantidade de tarefas já concluidas |


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
