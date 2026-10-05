const pool = require('../database/connection');

async function listarCategorias() {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(
            'SELECT * FROM categoria ORDER BY nome'
        );

        return resultado;
    } finally {
        conexao.release();
    }
}

async function buscarCategoria(id) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(
            'SELECT * FROM categoria WHERE id_categoria = ?',
            [id]
        );

        return resultado;
    } finally {
        conexao.release();
    }
}

async function criarCategoria(nome) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(
            'INSERT INTO categoria (nome) VALUES (?)',
            [nome]
        );

        return resultado;
    } finally {
        conexao.release();
    }
}

async function atualizarCategoria(id, nome) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(
            'UPDATE categoria SET nome = ? WHERE id_categoria = ?',
            [nome, id]
        );

        return resultado;
    } finally {
        conexao.release();
    }
}

async function excluirCategoria(id) {
    const conexao = await pool.getConnection();

    try {
        const resultado = await conexao.query(
            'DELETE FROM categoria WHERE id_categoria = ?',
            [id]
        );

        return resultado;
    } finally {
        conexao.release();
    }
}

module.exports = {
    listarCategorias,
    buscarCategoria,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria
};