const categoriaModel = require('../models/categoriaModel');

async function listarCategorias(req, res) {
    try {
        const categorias = await categoriaModel.listarCategorias();

        res.json(categorias);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao listar categorias'
        });
    }
}

async function buscarCategoria(req, res) {
    try {
        const id = req.params.id;

        const categoria = await categoriaModel.buscarCategoria(id);

        if (categoria.length === 0) {
            return res.status(404).json({
                mensagem: 'Categoria não encontrada'
            });
        }

        res.json(categoria[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar categoria'
        });
    }
}

async function criarCategoria(req, res) {
    try {
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'Nome da categoria é obrigatório'
            });
        }

        const resultado = await categoriaModel.criarCategoria(nome);

        res.status(201).json({
            mensagem: 'Categoria criada com sucesso',
            id: Number(resultado.insertId)
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao criar categoria'
        });
    }
}

async function atualizarCategoria(req, res) {
    try {
        const id = req.params.id;
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({
                mensagem: 'Nome da categoria é obrigatório'
            });
        }

        await categoriaModel.atualizarCategoria(id, nome);

        res.json({
            mensagem: 'Categoria atualizada com sucesso'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao atualizar categoria'
        });
    }
}

async function excluirCategoria(req, res) {
    try {
        const id = req.params.id;

        await categoriaModel.excluirCategoria(id);

        res.json({
            mensagem: 'Categoria excluída com sucesso'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao excluir categoria'
        });
    }
}

module.exports = {
    listarCategorias,
    buscarCategoria,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria
};