// Inicializa o carrinho com dados do localStorage ou vazio
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para exibir a página solicitada
function showPage(pageId) {
    document.querySelectorAll('.page').forEach((page) => {
        page.classList.remove('active');
    });
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
}

// Função para adicionar itens ao carrinho
function adicionarAoCarrinho(item) {
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para atualizar a lista de itens no carrinho
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    if (listaCarrinho) {
        listaCarrinho.innerHTML = carrinho
            .map((item) => `<li>${item}</li>`)
            .join('');
    }
}

// Função para carregar produtos da API e exibir na página "Produtos"
async function carregarProdutos() {
    try {
        const resposta = await fetch('https://fakestoreapi.com/products');
        const produtos = await resposta.json();
        const produtosContainer = document.querySelector('.produtos-list');

        if (produtosContainer) {
            produtosContainer.innerHTML = produtos
                .map(
                    (produto) => `
                <div class="produto">
                    <img src="${produto.image}" alt="${produto.title}">
                    <h3>${produto.title}</h3>
                    <p>Preço: R$ ${produto.price.toFixed(2)}</p>
                    <button data-item="${produto.title}">Adicionar ao Carrinho</button>
                </div>`
                )
                .join('');
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Adiciona eventos aos links de navegação para troca de páginas
document.querySelectorAll('[data-page]').forEach((link) => {
  link.addEventListener('click', (event) => {
      event.preventDefault();
      const page = event.target.closest('a').dataset.page; // Ajuste para evitar seleção do elemento errado
      showPage(page);
  });
});

// Adiciona eventos para os botões de "Adicionar ao Carrinho"
document.body.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.dataset.item) {
        const item = event.target.dataset.item;
        adicionarAoCarrinho(item);
    }
});

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(); // Carrega produtos na página "Produtos"
    atualizarCarrinho(); // Atualiza o carrinho com itens salvos
    showPage('home'); // Define "home" como página inicial
});
