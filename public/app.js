async function buscarPorNome() {
    const termo = document.getElementById("buscaNome").value;
    const res = await fetch(`/api/itens?nome=${termo}`);
    const dados = await res.json();
    renderizar(dados);
}

async function buscarPorCodigo() {
    const codigo = document.getElementById("buscaCodigo").value;
    const res = await fetch(`/api/itens?codigo=${codigo}`);

    if (!res.ok) {
        renderizar([]);
        return;
    }

    const texto = await res.text();

    try {
        const dado = JSON.parse(texto);
        renderizar([dado]);
    } catch (erro) {
        console.error("Resposta não é JSON:", texto);
        renderizar([]);
    }
}

function renderizar(listaItens) {
    const lista = document.getElementById("resultado");
    lista.innerHTML = "";

    if (listaItens.length === 0) {
        lista.innerHTML = "<li>Nenhum item encontrado</li>";
        return;
    }

    listaItens.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.codigo + " - " + item.item;
        lista.appendChild(li);
    });
}