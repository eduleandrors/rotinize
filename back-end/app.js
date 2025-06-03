const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Tarefa = require('./models/tarefa');
const StatusTarefa = require('./models/statusTarefa');

const app = express();
app.use(cors());
app.use(express.json());


// Conecta no banco e inicia o servidor:

sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('Servidor rodando em http://localhost:3001');
    });
});

// Rota GET - listar tarefas
app.get('/tarefas', async (req, res) => {
  const tarefas = await Tarefa.findAll();
  res.json(tarefas);
});

// Rota POST - adicionar tarefa
app.post('/tarefas', async (req, res) => {
  const { titulo, categoria, feita } = req.body;
  const novaTarefa = await Tarefa.create({ titulo, categoria, feita });
  res.json(novaTarefa);
});


// Rota PUT - Editar tarefa

app.put('/tarefas/:id', async (req, res) => {
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
});

// Rota DELETE - excluir tarefa
app.delete('/tarefas/:id', async (req,res)=>{
  const id = req.params.id;
  await Tarefa.destroy({where: {id}});
  res.sendStatus(204);
})