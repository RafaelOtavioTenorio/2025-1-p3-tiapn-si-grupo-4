### 3.3.3 Processo 3 AS-IS – Troca de peças
 
Modelo AS-IS:

![image](https://github.com/user-attachments/assets/690f7e6e-496a-44c1-8fb9-9a012e4c5545)

#### Detalhamento das atividades

**Identificar defeito na máquina**

| **Campo**          | **Tipo**         | **Restrições**         | **Valor default** |
| ---                | ---              | ---                    | ---               |
| id_maquina         | Caixa de Texto   | obrigatório            |                   |
| descrição_defeito  | Área de Texto    | mínimo 20 caracteres   |                   |
| data_ocorrência    | Data             | data atual ou anterior |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
| registrar            | Solicitação de peça            | default  |
| cancelar             | Fim do processo                | cancel   |

**Solicitar peça ao almoxarifado**

| **Campo**   | **Tipo**       | **Restrições**        | **Valor default** |
| ---         | ---            | ---                   | ---               |
| nome_peca   | Caixa de Texto | obrigatório           |                   |
| quantidade  | Número         | mínimo 1              |                   |
| urgência    | Seleção única  | baixa / média / alta  | média             |

| **Comandos** |  **Destino**                   | **Tipo**          |
| ---          | ---                            | ---               |
| enviar       | Verifica estoque               | default           |

**Verificar disponibilidade de peça**

| **Campo**              | **Tipo**       | **Restrições**               | **Valor default** |
| ---                    | ---            | ---                          | ---               |
| disponibilidade        | Seleção única  | disponível / indisponível    |                   |
| data_prevista_entrega  | Data           | se indisponível              |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| disponível           | Autorizar retirada             | default           |
| indisponível         | Solicitar aquisição            | default           |

**Realizar troca de peça**

| **Campo**            | **Tipo**       | **Restrições**           | **Valor default** |
| ---                  | ---            | ---                      | ---               |
| técnico_responsável  | Caixa de Texto | obrigatório              |                   |
| data_troca           | Data e Hora    | obrigatório              |                   |
| relatório_final      | Área de Texto  | mínimo 30 caracteres     |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| concluir             | Fim do processo                | default           |
