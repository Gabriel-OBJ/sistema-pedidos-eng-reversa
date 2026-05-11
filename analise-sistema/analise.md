# Análise do Sistema Real (Tropykaly Pizzas e Lanches)

## Parte 1 – Análise do Sistema Real

**1. Qual é o objetivo do sistema?**
O sistema tem como objetivo principal possibilitar que os clientes da Tropykaly visualizem o cardápio, montem seus pedidos e os finalizem de forma remota, funcionando como um canal de vendas online (e-commerce/delivery) para o estabelecimento.

**2. Quais funcionalidades ele oferece?**
- Exibição de cardápio digital por categorias.
- Personalização de produtos (ex: escolha de sabores de pizza, borda, adicionais).
- Carrinho de compras (adição, remoção e alteração de quantidade de itens).
- Autenticação e cadastro de usuários (login/registro).
- Finalização de pedido (checkout) com opções de pagamento e entrega/retirada.
- Acompanhamento de status do pedido.

**3. Como o usuário interage com o sistema?**
O usuário interage através de uma interface web (acessível por navegador mobile ou desktop). A navegação ocorre por cliques em links e botões, selecionando itens para o carrinho, preenchendo formulários para login/cadastro e etapas de checkout (endereço e pagamento).

**4. Como os produtos estão organizados?**
Os produtos são organizados de forma hierárquica por categorias principais (ex: Pizzas, Lanches, Bebidas, Porções). Dentro das categorias de pizzas, há subdivisões por tamanho e a possibilidade de montar pizzas com múltiplos sabores (meio a meio, etc).

## Parte 2 – Análise de Arquitetura

**Tipo de arquitetura:**
Com base no comportamento (reloads de página parciais ou totais, rotas estruturadas na URL), infere-se que o sistema segue uma arquitetura Cliente-Servidor clássica, possivelmente renderizada do lado do servidor (Server-Side Rendering - SSR), configurando uma aplicação Multi-Page Application (MPA) ou um híbrido com chamadas AJAX para interações dinâmicas (como adicionar ao carrinho).

**Possível divisão em camadas:**
Provavelmente segue a divisão de 3 camadas (Three-Tier Architecture):
- **Camada de Apresentação (Frontend):** HTML, CSS e JavaScript no navegador do cliente.
- **Camada de Aplicação/Negócio (Backend):** Servidor web executando uma linguagem server-side (muito provavelmente PHP, dada a natureza comum desse tipo de sistema de delivery regional).
- **Camada de Dados:** Banco de dados relacional (ex: MySQL/PostgreSQL) armazenando usuários, produtos, pedidos.

**Existência de separação de responsabilidades:**
Existe uma separação natural proporcionada pelo protocolo HTTP. O backend fica responsável pelas regras de negócio (cálculo de preços, validação de estoque, regras de entrega) e persistência, enquanto o frontend lida com a exibição e coleta de dados. Contudo, sem ver o código, é difícil afirmar se o backend segue um padrão estrito como MVC ou se mistura lógica com views.

## Parte 3 – Análise de Design

**Coesão:**
A coesão aparenta ser moderada a alta nas funcionalidades de negócio (módulo de carrinho só trata de carrinho, módulo de usuário só trata de perfil/login). No entanto, em sistemas MPA tradicionais, pode haver scripts ou controladores fazendo trabalho excessivo (ex: roteamento e acesso ao banco no mesmo arquivo).

**Acoplamento:**
Sendo um sistema web padrão, há acoplamento entre as views e os controladores que as alimentam. A interface depende estritamente das respostas do servidor. Se o sistema utilizar APIs RESTful puras para o carrinho, o acoplamento é menor, mas caso a página recarregue para cada ação (postback), o acoplamento entre UI e lógica de servidor é alto.

**Separação de responsabilidades:**
Ao nível de sistema, a interface, servidor web e banco de dados estão separados. Dentro da aplicação, a inferência sugere que deve haver classes ou módulos distintos para `Pedido`, `Produto`, `Usuario`, etc., separando as entidades de modelo dos controladores de rotas.
