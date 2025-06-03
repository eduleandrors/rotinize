const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize('rotinize', 'postgres', '220683',{
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;