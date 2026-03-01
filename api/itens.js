const fs = require("fs");
const path = require("path");

const dataPath = path.join(process.cwd(), "data", "itens.json");

module.exports = (req, res) => {
    const dados = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    const { codigo, nome } = req.query;

    if (codigo) {
        const item = dados.find(i => i.codigo == codigo);
        return item
            ? res.status(200).json(item)
            : res.status(404).json({ erro: "Item não encontrado" });
    }

    if (nome) {
        const resultado = dados.filter(i =>
            i.item.toLowerCase().includes(nome.toLowerCase())
        );
        return res.status(200).json(resultado);
    }

    res.status(200).json(dados);
};
