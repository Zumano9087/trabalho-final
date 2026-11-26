
const livros = document.querySelectorAll(".livros");

const pesquisa = document.querySelector("#pesquisa");

const categorias = document.querySelectorAll(".categorias button");

const botaoLista = document.querySelector("#minha-lista");

let favoritos = [];

let mostrarFavoritos = false;


pesquisa.addEventListener("input", filtrarLivros);


categorias.forEach(botao => {

    botao.addEventListener("click", () => {

        categorias.forEach(item => {
            item.classList.remove("ativa");
        });

        botao.classList.add("ativa");

        mostrarFavoritos = false;

        filtrarLivros();

    });

});



document.querySelectorAll(".favorito").forEach(botao => {

    botao.addEventListener("click", () => {

        const livro = botao.parentElement;

        if (favoritos.includes(livro)) {

            favoritos = favoritos.filter(item => item !== livro);

            botao.textContent = "♡ Favoritar";

            botao.classList.remove("salvo");

        } else {

            favoritos.push(livro);

            botao.textContent = "♥ Favoritado";

            botao.classList.add("salvo");

        }

        filtrarLivros();

    });

});


botaoLista.addEventListener("click", () => {

    mostrarFavoritos = !mostrarFavoritos;

    filtrarLivros();

});

function filtrarLivros() {

    const texto = pesquisa.value.toLowerCase();

    const categoriaAtiva = document.querySelector(
        ".categorias button.ativa"
    );

    const categoria = categoriaAtiva.dataset.categoria;

    livros.forEach(livro => {

        const nome = livro.dataset.nome.toLowerCase();

        const categoriasLivro = livro.dataset.categoria;

        const encontrouNome = nome.includes(texto);

        const encontrouCategoria =
            categoria === "todos" ||
            categoriasLivro.includes(categoria);

        const encontrouFavorito =
            !mostrarFavoritos ||
            favoritos.includes(livro);

        livro.style.display =
            encontrouNome &&
            encontrouCategoria &&
            encontrouFavorito
            ? "block"
            : "none";

    });

}
