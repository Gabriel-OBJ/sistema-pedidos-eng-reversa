# Parte 6 – Modelagem do Sistema

## Identificação de Entidades
Com base na observação do comportamento do sistema, as principais entidades são:
1. Cliente
2. Produto (podendo ter especializações como Pizza, Lanche, Bebida)
3. Pedido
4. ItemPedido
5. Categoria

## Definição de Classes e Métodos

- **Cliente**:
  - *Atributos*: id, nome, email, telefone, senha
  - *Métodos*: cadastrar(), autenticar(), recuperarSenha()
- **Produto**:
  - *Atributos*: id, nome, descricao, precoBase, categoriaId
  - *Métodos*: obterPrecoFinal()
- **Pizza (herda de Produto)**:
  - *Atributos*: tamanho, sabores(lista), bordaRecheada
  - *Métodos*: calcularPrecoFracionado()
- **Pedido**:
  - *Atributos*: id, clienteId, itens(lista), dataHora, status, taxaEntrega, valorTotal
  - *Métodos*: adicionarItem(), calcularTotal(), finalizar(), atualizarStatus()
- **ItemPedido**:
  - *Atributos*: produtoId, quantidade, subtotal, observacao
  - *Métodos*: calcularSubtotal()
- **Categoria**:
  - *Atributos*: id, nome
  - *Métodos*: listarProdutos()

## Diagrama de Classes UML
diagrama.png

## Justificativa das escolhas
A modelagem foi definida com base nas operações padrão de um e-commerce de alimentos:
- A separação entre `Pedido` e `ItemPedido` é essencial (Padrão de normalização) porque um pedido pode conter múltiplos produtos diferentes, cada um com sua própria quantidade e observação (ex: "sem cebola").
- A herança de `Pizza` a partir de `Produto` se justifica porque a pizza possui regras de negócio específicas (ex: calcular preço escolhendo a metade mais cara, acréscimo de borda) que um lanche comum ou bebida não possui.
- O relacionamento entre `Cliente` e `Pedido` é de 1 para N (Um cliente faz muitos pedidos, mas cada pedido pertence a um único cliente).
