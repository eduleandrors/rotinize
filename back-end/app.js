const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes')

const Tarefa = require('./models/task');

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tabelas sincronizadas!');
  })
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));

const app = express();
app.use(cors());
app.use(express.json());


app.use('/tarefas', taskRoutes);
module.exports = app;
