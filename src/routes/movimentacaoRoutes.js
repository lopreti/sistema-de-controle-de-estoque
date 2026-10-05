const express = require('express');

const movimentacaoController = require('../controllers/movimentacaoController');

const router = express.Router();

router.get('/', movimentacaoController.listarMovimentacoes);
router.get('/:id', movimentacaoController.buscarMovimentacao);
router.post('/', movimentacaoController.criarMovimentacao);
router.delete('/:id', movimentacaoController.excluirMovimentacao);

module.exports = router;