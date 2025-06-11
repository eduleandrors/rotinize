const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tarefa = sequelize.define('Tarefa', {

    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    categoria:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    feita: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Tarefa;