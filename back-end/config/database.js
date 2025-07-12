const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize('u492019782_rotinize', 'u492019782_root', 'ccz]%nLJaYGh4nHD',{
    host: '193.203.175.197',
    dialect: 'mysql',
    port: 3306,
    logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Conexão com MySQL bem-sucedida!'))
  .catch(err => console.error('Erro na conexão:', err));

module.exports = sequelize;