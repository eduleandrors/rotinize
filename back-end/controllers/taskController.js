const Tarefa = require('../models/task');

exports.listarTarefas = async (req, res) => {
  const tarefas = await Tarefa.findAll({
    order: [['horario', 'ASC']]
  });
  res.json(tarefas);
};

exports.listarTarefasDone = async (req, res) => {
  try {
    const tarefasConcluidas = await Tarefa.findAll({
      where: { feita: true }
    });
    res.json(tarefasConcluidas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas concluídas' });
  }
};

exports.listarTarefasPending = async (req, res) => {
  try {
    const tarefasPendentes = await Tarefa.findAll({
      where: { feita: false }
    });
    res.json(tarefasPendentes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas pendentes' });
  }
};

exports.criarTarefa = async (req, res) => {
  const { titulo, horario, categoria, important, descricao, feita } = req.body;
  const novaTarefa = await Tarefa.create({ titulo, horario, categoria, important, descricao, feita });
  res.json(novaTarefa);
};

exports.atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, horario, categoria, important, descricao, feita } = req.body;

  try {
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    tarefa.titulo = titulo;
    tarefa.horario = horario;
    tarefa.categoria = categoria;
    tarefa.important = important;
    tarefa.descricao = descricao;
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
