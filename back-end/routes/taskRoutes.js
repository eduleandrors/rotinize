const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.listarTarefas);
router.get('/done', taskController.listarTarefasDone);
router.get('/pending', taskController.listarTarefasPending);
router.post('/', taskController.criarTarefa);
router.put('/:id', taskController.atualizarTarefa);
router.delete('/:id', taskController.excluirTarefa);

module.exports = router;
