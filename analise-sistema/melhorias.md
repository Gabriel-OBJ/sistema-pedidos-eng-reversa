# Problemas Identificados, Aplicação de Padrões e Reflexão

## Parte 7 – Problemas Identificados
Ao analisar o sistema real Tropykaly pelo comportamento (Engenharia Reversa de Caixa Preta), os possíveis problemas estruturais identificados seriam:

- **Limitações de Arquitetura:** Por se assemelhar a uma arquitetura Web tradicional baseada em PHP (onde muitas vezes o MVC não é estritamente aplicado), pode existir forte mistura de código HTML com lógica do servidor, resultando em reloads excessivos de página que prejudicam a fluidez da experiência do usuário em dispositivos móveis.
- **Alto Acoplamento:** Em sistemas construídos sem uso rigoroso de Repository ou Service Patterns, controladores costumam realizar *queries* SQL diretas, ficando altamente acoplados ao esquema de banco de dados.
- **Dificuldade de Manutenção:** Ao adicionar novas regras (como uma promoção complexa ou um novo tipo de pagamento), a falta de modularização exige modificações em múltiplos lugares do código, aumentando o risco de regressões e falhas no sistema.

## Parte 9 – Aplicação de Padrões

**Factory (Factory Method / Abstract Factory):**
- *Como aplicar:* Na criação de objetos `Produto`. Quando um usuário adiciona um item ao carrinho, em vez de o sistema instanciar os objetos de forma direta com `new Pizza()` ou `new Bebida()`, poderia ser utilizada uma classe `ProdutoFactory`.
- *Por que aplicar:* A fábrica analisaria os dados recebidos da requisição e seria a única responsável por decidir qual subclasse instanciar, garantindo que pizzas recebam seus decorators (como bordas recheadas e metades de sabor) e bebidas não, mantendo o código do Controller extremamente limpo.

**Singleton:**
- *Como aplicar:* No gerenciamento do "Carrinho de Compras" na sessão do usuário ou na gestão do "Pool de Conexões" com o Banco de Dados.
- *Por que aplicar:* Para garantir que durante todo o ciclo de vida de uma requisição ou de uma sessão do frontend, o usuário sempre interaja com a exata mesma instância do carrinho, impedindo duplicações ou conflitos de estado quando abas diferentes são utilizadas.

## Parte 10 – Reflexão Crítica

**1. É possível modelar um sistema sem ver o código?**
Sim. Através da Engenharia Reversa baseada em comportamento (observação de entradas, saídas e estado da interface), é perfeitamente viável deduzir as entidades e os processos que operam nos bastidores. Isso é amplamente usado ao criar integrações ou entender fluxos de sistemas fechados.

**2. Qual a importância da modelagem?**
A modelagem é o equivalente a fazer o projeto estrutural antes de construir um prédio. Ela permite que a equipe enxergue os gargalos, as relações entre entidades e valide o design antes de investir tempo e dinheiro escrevendo o código em si.

**3. Diferença entre sistema real e didático?**
Um sistema didático, como o carrinho de compras analisado na atividade anterior, visa apenas demonstrar funcionalidades isoladas (soma de totais) em ambiente controlado, ignorando completamente segurança, persistência e arquitetura. Já um sistema real como o da Tropykaly lida com dados sensíveis, concorrência (várias pessoas pedindo ao mesmo tempo) e precisa de persistência resiliente. Isso o obriga a adotar arquiteturas como Cliente-Servidor com regras complexas de validação que o sistema didático não possui.
