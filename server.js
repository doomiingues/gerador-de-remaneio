const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const dataPath = path.join(__dirname,"data", "itens.json");

// Função para ler o JSON
function carregarDados() {
    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw);
}

// Rota: listar todos os itens
app.get("/itens", (req, res) => {
    const dados = carregarDados();
    res.json(dados);
});

// Rota: buscar por código
app.get("/itens/:codigo", (req, res) => {
    const dados = carregarDados();
    const codigo = req.params.codigo;

    const item = dados.find(i => i.codigo == codigo);

    if (!item) {
        return res.status(404).json({ erro: "Item não encontrado" });
    }

    res.json(item);
});

// Rota: buscar por nome (parcial)
app.get("/buscar", (req, res) => {
    const dados = carregarDados();
    const termo = req.query.nome?.toLowerCase();

    if (!termo) {
        return res.status(400).json({ erro: "Informe ?nome=alguma_coisa" });
    }

    const resultado = dados.filter(i =>
        i.item.toLowerCase().includes(termo)
    );

    res.json(resultado);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
