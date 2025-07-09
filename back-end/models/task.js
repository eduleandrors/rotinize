const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarefa = sequelize.define('Tarefa', {

    titulo:{
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    categoria:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    horario: {
        type: DataTypes.TIME,
        allowNull: true,
    },

    important: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    descricao: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },

    feita: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Tarefa;