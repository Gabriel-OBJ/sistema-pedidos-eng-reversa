// --- Modelos ---

// Classe Produto
class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
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
    this.itens = [];
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
      // Lógica direta sem Factory
      let preco = 0;
      let nomeFormatado = "";
      if (produtoNome === "pastel") { preco = 5; nomeFormatado = "Pastel"; }
      else if (produtoNome === "caldo") { preco = 7; nomeFormatado = "Caldo"; }
      else if (produtoNome === "refrigerante") { preco = 4; nomeFormatado = "Refrigerante"; }
      else if (produtoNome === "suco") { preco = 6; nomeFormatado = "Suco"; }
      else { throw new Error("Produto inválido"); }
      
      const produto = new Produto(nomeFormatado, preco);
      const item = new ItemPedido(produto, qtd);

      // Uso do pedido global
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