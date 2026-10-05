const movimentacaoModel = require('../models/movimentacaoModel');

async function listarMovimentacoes(req, res) {
    try {
        const movimentacoes = await movimentacaoModel.listarMovimentacoes();

        res.json(movimentacoes);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao listar movimentações'
        });
    }
}

async function buscarMovimentacao(req, res) {
    try {
        const id = req.params.id;

        const movimentacao = await movimentacaoModel.buscarMovimentacao(id);

        if (movimentacao.length === 0) {
            return res.status(404).json({
                mensagem: 'Movimentação não encontrada'
            });
        }

        res.json(movimentacao[0]);
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar movimentação'
        });
    }
}

async function criarMovimentacao(req, res) {
    try {
        const {
            id_produto,
            tipo,
            quantidade,
            valor_unitario,
            data_movimentacao
        } = req.body;

        if (
            !id_produto ||
            !tipo ||
            !quantidade ||
            !valor_unitario ||
            !data_movimentacao
        ) {
            return res.status(400).json({
                mensagem: 'Preencha todos os campos'
            });
        }

        if (tipo !== 'ENTRADA' && tipo !== 'SAIDA') {
            return res.status(400).json({
                mensagem: 'O tipo deve ser ENTRADA ou SAIDA'
            });
        }

        const resultado = await movimentacaoModel.criarMovimentacao(
            id_produto,
            tipo,
            quantidade,
            valor_unitario,
            data_movimentacao
        );

        res.status(201).json({
            mensagem: 'Movimentação criada com sucesso',
            id: Number(resultado.insertId)
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao criar movimentação'
        });
    }
}

async function excluirMovimentacao(req, res) {
    try {
        const id = req.params.id;

        await movimentacaoModel.excluirMovimentacao(id);

        res.json({
            mensagem: 'Movimentação excluída com sucesso'
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao excluir movimentação'
        });
    }
}

module.exports = {
    listarMovimentacoes,
    buscarMovimentacao,
    criarMovimentacao,
    excluirMovimentacao
};