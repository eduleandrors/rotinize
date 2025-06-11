const app = require('./app');
const sequelize = require('./config/database');

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001');
  });
});
