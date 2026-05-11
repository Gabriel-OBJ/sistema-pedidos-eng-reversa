# Parte 8 – Proposta de Arquitetura

## Organização em Camadas e MVC
Para modernizar e garantir a escalabilidade e fácil manutenção do sistema Tropykaly, propõe-se uma arquitetura estruturada usando o padrão arquitetural **MVC (Model-View-Controller)** dentro de uma abordagem em **Camadas (N-Tier)**:

1. **Camada de Apresentação (View / Frontend):**
   - Responsável pela interface com o usuário (UI) e experiência (UX).
   - Comunica-se com o backend através de requisições HTTP (RESTful API).
   - Componentes visuais como Cardápio, Carrinho e Formulários ficam isolados do banco de dados.

2. **Camada de Aplicação/Controladores (Controller):**
   - Recebe as requisições do frontend e coordena o fluxo de dados.
   - Realiza a validação de inputs (ex: validar se os dados de pagamento estão preenchidos) e delega o processamento para a camada de domínio.

3. **Camada de Domínio (Model / Regras de Negócio):**
   - Onde residem as lógicas centrais. As classes de modelo representam o núcleo do negócio (`Pedido`, `Produto`, `Usuario`).
   - Lida com cálculos complexos, como aplicar taxas de entrega com base no endereço e fracionamento de preços de pizzas.

4. **Camada de Persistência (Data Access / Repository):**
   - Responsável exclusiva por interagir com o banco de dados.
   - Encapsula as instruções SQL, mantendo a camada de negócios limpa de detalhes de infraestrutura de dados.

## Separação de Responsabilidades
Esta organização permite que a equipe divida o trabalho de forma eficiente:
- **Frontend developers** trabalham nas Views sem medo de quebrar lógicas de cálculo no banco.
- **Backend developers** otimizam consultas e regras de negócio sem afetar o layout.
- Possibilita o desenvolvimento de novos canais de venda (como um aplicativo mobile nativo) reaproveitando toda a lógica da Camada de Domínio e de Persistência, alterando apenas a View.

## Componentes Principais
- **Módulo de Catálogo e Estoque:** Gerencia os produtos visíveis, inativos e os ingredientes disponíveis.
- **Módulo de Carrinho e Checkout:** Coordena os itens em memória, sessão do cliente, e se comunica com Gateways de Pagamento na finalização.
- **Módulo de Usuários:** Controla o registro, a autenticação segura (ex: JWT) e o histórico de pedidos.
- **Painel Administrativo:** Permite aos administradores/cozinha visualizar pedidos em tempo real, mudar seus status e gerenciar relatórios financeiros.
