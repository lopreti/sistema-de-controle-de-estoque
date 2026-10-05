const express = require('express');

const categoriaController = require('../controllers/categoriaController');

const router = express.Router();

router.get('/', categoriaController.listarCategorias);
router.get('/:id', categoriaController.buscarCategoria);
router.post('/', categoriaController.criarCategoria);
router.put('/:id', categoriaController.atualizarCategoria);
router.delete('/:id', categoriaController.excluirCategoria);

module.exports = router;