const pool = require('../database/connection');

async function listarProdutos() {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(`
            SELECT
                p.id_produto,
                p.nome,
                c.nome AS categoria,
                p.id_categoria,
                p.unidade_medida,
                p.quantidade,
                p.valor_unitario,
                p.estoque_minimo,
                p.estoque_maximo
            FROM produto p
            INNER JOIN categoria c
                ON p.id_categoria = c.id_categoria
            ORDER BY p.nome
        `);

        return resultado;
    } finally {
        conexao.release();
    }
}

async function buscarProduto(id) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(`
            SELECT
                p.id_produto,
                p.nome,
                c.nome AS categoria,
                p.id_categoria,
                p.unidade_medida,
                p.quantidade,
                p.valor_unitario,
                p.estoque_minimo,
                p.estoque_maximo
            FROM produto p
            INNER JOIN categoria c
                ON p.id_categoria = c.id_categoria
            WHERE p.id_produto = ?
        `, [id]);

        return resultado;
    } finally {
        conexao.release();
    }
}

async function criarProduto(
    id_categoria,
    nome,
    unidade_medida,
    quantidade,
    valor_unitario,
    estoque_minimo,
    estoque_maximo
) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(`
            INSERT INTO produto
            (
                id_categoria,
                nome,
                unidade_medida,
                quantidade,
                valor_unitario,
                estoque_minimo,
                estoque_maximo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
            id_categoria,
            nome,
            unidade_medida,
            quantidade,
            valor_unitario,
            estoque_minimo,
            estoque_maximo
        ]);

        return resultado;
    } finally {
        conexao.release();
    }
}

async function atualizarProduto(
    id,
    id_categoria,
    nome,
    unidade_medida,
    quantidade,
    valor_unitario,
    estoque_minimo,
    estoque_maximo
) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(`
            UPDATE produto
            SET
                id_categoria = ?,
                nome = ?,
                unidade_medida = ?,
                quantidade = ?,
                valor_unitario = ?,
                estoque_minimo = ?,
                estoque_maximo = ?
            WHERE id_produto = ?
        `, [
            id_categoria,
            nome,
            unidade_medida,
            quantidade,
            valor_unitario,
            estoque_minimo,
            estoque_maximo,
            id
        ]);

        return resultado;
    } finally {
        conexao.release();
    }
}

async function excluirProduto(id) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(
            'DELETE FROM produto WHERE id_produto = ?',
            [id]
        );

        return resultado;
    } finally {
        conexao.release();
    }
}

module.exports = {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    excluirProduto
};