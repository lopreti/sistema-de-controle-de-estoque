const produtoModel = require('../models/produtoModel');

async function listarProdutos(req, res) {
    try {
        const produtos = await produtoModel.listarProdutos();

        res.json(produtos);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao listar produtos'
        });
    }
}

async function buscarProduto(req, res) {
    try {
        const id = req.params.id;

        const produto = await produtoModel.buscarProduto(id);

        if (produto.length === 0) {
            return res.status(404).json({
                mensagem: 'Produto não encontrado'
            });
        }

        res.json(produto[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar produto'
        });
    }
}

async function criarProduto(req, res) {
    try {
        const {
            id_categoria,
            nome,
            unidade_medida,
            quantidade,
            valor_unitario,
            estoque_minimo,
            estoque_maximo
        } = req.body;

        if (!id_categoria || !nome || !unidade_medida || !valor_unitario) {
            return res.status(400).json({
                mensagem: 'Preencha os campos obrigatórios'
            });
        }

        const resultado = await produtoModel.criarProduto(
            id_categoria,
            nome,
            unidade_medida,
            quantidade || 0,
            valor_unitario,
            estoque_minimo || 0,
            estoque_maximo || 100
        );

        res.status(201).json({
            mensagem: 'Produto criado com sucesso',
            id: Number(resultado.insertId)
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao criar produto'
        });
    }
}

async function atualizarProduto(req, res) {
    try {
        const id = req.params.id;

        const {
            id_categoria,
            nome,
            unidade_medida,
            quantidade,
            valor_unitario,
            estoque_minimo,
            estoque_maximo
        } = req.body;

        await produtoModel.atualizarProduto(
            id,
            id_categoria,
            nome,
            unidade_medida,
            quantidade,
            valor_unitario,
            estoque_minimo,
            estoque_maximo
        );

        res.json({
            mensagem: 'Produto atualizado com sucesso'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao atualizar produto'
        });
    }
}

async function excluirProduto(req, res) {
    try {
        const id = req.params.id;

        await produtoModel.excluirProduto(id);

        res.json({
            mensagem: 'Produto excluído com sucesso'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao excluir produto'
        });
    }
}

module.exports = {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    excluirProduto
};