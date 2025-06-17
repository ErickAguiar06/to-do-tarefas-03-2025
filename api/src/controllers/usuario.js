const prisma = require('../connect');

const criarUsuario = async (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) return res.status(400).json({ erro: "Campos obrigatórios" });

  try {
    const usuario = await prisma.usuario.create({ data: { nome, email } });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar usuário", detalhe: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({ include: { tarefas: true } });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
};

module.exports = { criarUsuario, listarUsuarios };
