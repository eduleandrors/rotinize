const Tarefa = require('../models/task');

exports.listarTarefas = async (req, res) => {
  const tarefas = await Tarefa.findAll();
  res.json(tarefas);
};

exports.criarTarefa = async (req, res) => {
  const { titulo, categoria, feita } = req.body;
  const novaTarefa = await Tarefa.create({ titulo, categoria, feita });
  res.json(novaTarefa);
};

exports.atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, categoria, feita } = req.body;

  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefa.titulo = titulo;
    tarefa.categoria = categoria;
    tarefa.feita = feita;
    await tarefa.save();

    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
  }
};

exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  await Tarefa.destroy({ where: { id } });
  res.sendStatus(204);
};
