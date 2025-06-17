const prisma = require('../connect');

const criarTarefa = async (req, res) => {
  const { descricao, setor, prioridade, usuarioId } = req.body;
  if (!descricao || !setor || !prioridade || !usuarioId)
    return res.status(400).json({ erro: "Campos obrigatórios" });

  try {
    const tarefa = await prisma.tarefa.create({
      data: {
        descricao,
        setor,
        prioridade,
        usuarioId,
      },
    });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar tarefa", detalhe: error.message });
  }
};

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({ include: { usuario: true } });
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
};

const atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { status, prioridade } = req.body;

  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { status, prioridade },
    });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar tarefa", detalhe: error.message });
  }
};

module.exports = { criarTarefa, listarTarefas, atualizarTarefa };
