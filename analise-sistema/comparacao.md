# Parte 5 – Comparação com Sistema Didático

Abaixo apresentamos a comparação entre o sistema didático analisado anteriormente e o sistema real em produção (Tropykaly).

| Critério | Sistema Real (Tropykaly) | Sistema Didático |
| :--- | :--- | :--- |
| **Arquitetura** | Cliente-Servidor, Multicamadas (Banco de dados, Backend, Frontend). | Monolítica, executada puramente no Frontend (navegador). |
| **Coesão** | Alta/Moderada. Módulos separados para backend e frontend. | Muito baixa. Uma única função realiza múltiplas tarefas (UI, negócios, dados). |
| **Acoplamento** | Moderado. Frontend e Backend comunicam-se via HTTP/APIs. | Muito alto. Regras de negócio fortemente acopladas a elementos HTML específicos. |
| **Organização** | Estruturada, com banco de dados, gestão de rotas e sessões reais. | Script procedural ("Spaghetti Code"), em um único arquivo JS e variáveis globais. |
| **Flexibilidade** | Alta. Permite adicionar regras complexas de taxas, pagamentos e estoque no backend. | Muito baixa. Difícil adicionar novas lógicas sem quebrar as existentes. |

## Explicação das principais diferenças
Enquanto o sistema didático foi criado como um protótipo rápido para fins educacionais, onde todo o estado (carrinho) é gerenciado via DOM e `localStorage` no próprio navegador, o sistema real da Tropykaly possui uma estrutura robusta baseada em servidor. O sistema real precisa garantir segurança (transações de pagamento, senhas), persistência confiável (banco de dados) e concorrência (vários usuários pedindo ao mesmo tempo). Portanto, utiliza separação de camadas, enquanto o didático mistura tudo em funções JavaScript globais sem padrões arquiteturais.
