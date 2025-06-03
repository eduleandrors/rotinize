const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tarefa = require('../models/tarefa');

const StatusTarefa = sequelize.define('StatusTarefa', {

    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    feita: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

StatusTarefa.belongsTo(Tarefa, {foreignKey: 'tarefaId'});
Tarefa.hasMany(StatusTarefa, {foreignKey: 'tarefaId'});

module.exports = Tarefa;