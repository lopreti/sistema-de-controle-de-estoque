const pool = require('../database/connection');

async function listarMovimentacoes() {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(`
            SELECT
                m.id_movimentacao,
                m.id_produto,
                p.nome AS produto,
                m.tipo,
                m.quantidade,
                m.valor_unitario,
                (m.quantidade * m.valor_unitario) AS valor_total,
                m.data_movimentacao
            FROM movimentacao m
            INNER JOIN produto p
                ON m.id_produto = p.id_produto
            ORDER BY m.data_movimentacao DESC
        `);

        return resultado;
    } finally {
        conexao.release();
    }
}

async function buscarMovimentacao(id) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(`
            SELECT
                m.id_movimentacao,
                m.id_produto,
                p.nome AS produto,
                m.tipo,
                m.quantidade,
                m.valor_unitario,
                (m.quantidade * m.valor_unitario) AS valor_total,
                m.data_movimentacao
            FROM movimentacao m
            INNER JOIN produto p
                ON m.id_produto = p.id_produto
            WHERE m.id_movimentacao = ?
        `, [id]);

        return resultado;
    } finally {
        conexao.release();
    }
}

async function criarMovimentacao(
    id_produto,
    tipo,
    quantidade,
    valor_unitario,
    data_movimentacao
) {
    const conexao = await pool.getConnection();

    try {
        await conexao.beginTransaction();

        const resultado = await conexao.query(`
            INSERT INTO movimentacao
            (
                id_produto,
                tipo,
                quantidade,
                valor_unitario,
                data_movimentacao
            )
            VALUES (?, ?, ?, ?, ?)
        `, [
            id_produto,
            tipo,
            quantidade,
            valor_unitario,
            data_movimentacao
        ]);

        if (tipo === 'ENTRADA') {
            await conexao.query(`
                UPDATE produto
                SET quantidade = quantidade + ?
                WHERE id_produto = ?
            `, [quantidade, id_produto]);
        }

        if (tipo === 'SAIDA') {
            await conexao.query(`
                UPDATE produto
                SET quantidade = quantidade - ?
                WHERE id_produto = ?
            `, [quantidade, id_produto]);
        }

        await conexao.commit();

        return resultado;
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
}

async function excluirMovimentacao(id) {
    const conexao = await pool.getConnection();

    try {
        const movimentacao = await conexao.query(`
            SELECT
                id_produto,
                tipo,
                quantidade
            FROM movimentacao
            WHERE id_movimentacao = ?
        `, [id]);

        if (movimentacao.length === 0) {
            return null;
        }

        const registro = movimentacao[0];

        await conexao.beginTransaction();

        if (registro.tipo === 'ENTRADA') {
            await conexao.query(`
                UPDATE produto
                SET quantidade = quantidade - ?
                WHERE id_produto = ?
            `, [
                registro.quantidade,
                registro.id_produto
            ]);
        }

        if (registro.tipo === 'SAIDA') {
            await conexao.query(`
                UPDATE produto
                SET quantidade = quantidade + ?
                WHERE id_produto = ?
            `, [
                registro.quantidade,
                registro.id_produto
            ]);
        }

        await conexao.query(
            'DELETE FROM movimentacao WHERE id_movimentacao = ?',
            [id]
        );

        await conexao.commit();

        return true;
    } catch (erro) {
        await conexao.rollback();
        throw erro;
    } finally {
        conexao.release();
    }
}

module.exports = {
    listarMovimentacoes,
    buscarMovimentacao,
    criarMovimentacao,
    excluirMovimentacao
};