// --- Modelos ---

// Classe Produto
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}

// Factory de Produto
class ProdutoFactory {
  static criarProduto(nome) {
    switch (nome) {
      case "pastel": return new Produto("Pastel", 5);
      case "caldo": return new Produto("Caldo", 7);
      case "refrigerante": return new Produto("Refrigerante", 4);
      case "suco": return new Produto("Suco", 6);
      default: throw new Error("Produto inválido");
    }
  }
}
// Classe ItemPedido
class ItemPedido {
  constructor(produto, quantidade) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  getSubtotal() {
    return this.produto.preco * this.quantidade;
  }
}

// Singleton de Pedido
class Pedido {
  constructor() {
    if (Pedido.instance) {
      return Pedido.instance;
    }
    this.itens = [];
    Pedido.instance = this;
  }

  adicionarItem(item) {
    this.itens.push(item);
  }

  removerUltimoItem() {
    this.itens.pop();
  }

  limpar() {
    this.itens = [];
  }

  calcularTotal() {
    return this.itens.reduce((soma, item) => soma + item.getSubtotal(), 0);
  }

  calcularDesconto() {
    const total = this.calcularTotal();
    if (total > 100) return total * 0.2;
    if (total > 50) return total * 0.1;
    return 0;
  }

  calcularTaxa() {
    return this.calcularTotal() * 0.05;
  }

  calcularTotalFinal() {
    return this.calcularTotal() - this.calcularDesconto() + this.calcularTaxa();
  }
}

const pedidoAtual = new Pedido();

// --- Regras de Dados ---
class StorageController {
  static salvarTotal(total) {
    localStorage.setItem("total", total);
  }

  static salvarUltimoPedido(totalFinal) {
    localStorage.setItem("ultimoPedido", totalFinal);
  }
}

// --- Controladores da Interface ---
class UIController {
  static adicionar() {
    const produtoNome = document.getElementById("produto").value;
    const qtdInput = document.getElementById("qtd").value;
    const qtd = parseInt(qtdInput);

    if (isNaN(qtd) || qtd <= 0) {
      alert("Quantidade inválida");
      return;
    }

    try {
      // Uso da Factory
      const produto = ProdutoFactory.criarProduto(produtoNome);
      const item = new ItemPedido(produto, qtd);

      // Uso do Singleton
      pedidoAtual.adicionarItem(item);

      UIController.atualizarLista();
    } catch (e) {
      alert(e.message);
    }
  }

  static atualizarLista() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    pedidoAtual.itens.forEach(item => {
      const li = document.createElement("li");
      li.innerText = `${item.produto.nome} | Qtd: ${item.quantidade} | R$ ${item.getSubtotal().toFixed(2)}`;
      lista.appendChild(li);
    });

    const total = pedidoAtual.calcularTotal();
    document.getElementById("total").innerText = total.toFixed(2);
    StorageController.salvarTotal(total);
  }

  static finalizar() {
    if (pedidoAtual.itens.length === 0) {
      alert("Pedido vazio!");
      return;
    }

    const totalFinal = pedidoAtual.calcularTotalFinal();

    alert(`Total final: R$ ${totalFinal.toFixed(2)}`);
    StorageController.salvarUltimoPedido(totalFinal);

    UIController.limparTudo();
  }

  static limparTudo() {
    pedidoAtual.limpar();
    document.getElementById("qtd").value = "";
    UIController.atualizarLista();
  }
}

function adicionar() {
  UIController.adicionar();
}

function finalizar() {
  UIController.finalizar();
}

function limparTudo() {
  UIController.limparTudo();
}

function removerUltimo() {
  pedidoAtual.removerUltimoItem();
  UIController.atualizarLista();
}