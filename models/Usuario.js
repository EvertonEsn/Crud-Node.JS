const sequelize = require('sequelize');
const db = require('../connection');

const Usuario = db.define('usuarios', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: sequelize.STRING,
    required: true,
    allowNull: false
  },
  usuario: {
    type: sequelize.STRING,
    required: true
  },
  senha: {
    type: sequelize.STRING,
    required: true
  },
  tipo: {
    type: sequelize.STRING,
    required: true
  },
  status: {
    type: sequelize.STRING,
    required: true
  },
  imagem: {
    type: sequelize.STRING,
    required: true
  }
});

module.exports = Usuario;
