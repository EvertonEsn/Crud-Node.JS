const sequelize = require('sequelize');
const conexao = new sequelize('BD_FUNC', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  conexao.authenticate();
  console.log('Conectando ao Mysql');
} catch (err) {
  console.log(`Erro encontrado: ${err}`);
}

module.exports = conexao; 
