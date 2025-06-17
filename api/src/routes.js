const express = require('express');
const router = express.Router();

const { criarUsuario, listarUsuarios } = require('./controllers/usuario');
const { criarTarefa, listarTarefas, atualizarTarefa } = require('./controllers/tarefa');

// Rotas de usuário
router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);

// Rotas de tarefa
router.post('/tarefas', criarTarefa);
router.get('/tarefas', listarTarefas);
router.put('/tarefas/:id', atualizarTarefa);

module.exports = router;