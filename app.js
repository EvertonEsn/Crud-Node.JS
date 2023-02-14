const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const conn = require('./connection');
const Usuario = require('./models/Usuario');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'R!0QcZu53t5O^RK9OZ',
    resave: true,
    saveUnitialized: true
  })
);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/admin', (req, res) => {
  if (req.session.user) {
    res.render('admin', { user: req.session.user });
    return;
  }
  res.redirect('/login');
});

app.post('/login', async (req, res) => {
  const login = req.body;
  const user1 = login.usuario;
  const senh = login.senha;

  const dadosLogin = await Usuario.findOne({
    raw: true,
    where: { usuario: user1, senha: senh }
  });

  dadosLogin
    ? ((req.session.user = dadosLogin.usuario), res.redirect('/admin'))
    : res.redirect('/login');
});

app.get('/sair', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/usuarios', (req, res) => {
  if (req.session.user) {
    res.render('usuarios', { user: req.session.user });
    return;
  }
  res.redirect('/login');
});

app.post('/usuarios', async (req, res) => {
  const usuarios = req.body;

  const nome = usuarios.nome;
  const usuario = usuarios.usuario;
  const senha = usuarios.senha;
  const tipo = usuarios.tipo;
  const status = usuarios.status;

  await Usuario.create({ nome, usuario, senha, tipo, status });
  res.redirect('/');
});

app.get('/usuario/:id', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  const userLogado = req.session.user;
  const id = req.params.id;

  const dados = await Usuario.findOne({ raw: true, where: { id: id } });
  res.render('usuario', { dados, user: userLogado });
});

app.get('/listarUsu', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }

  const userLogado = user;
  const dados = await Usuario.findAll({ raw: true });
  //console.log(dados);
  res.render('listarUsu', { usuarios: dados, user: userLogado });
});

app.post('/atualizar', async (req, res) => {
  const dados = req.body;

  const id = dados.id;
  // const nome = dados.nome;
  // const usuario = dados.usuario;
  // const senha = dados.senha;
  // const tipo = dados.tipo;
  // const status = dados.status;

  await Usuario.update(dados, { where: { id: id } });
  res.redirect('/listarUsu');
});

app.get('/excluir/:id', async (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
    return;
  }
  const id = req.params.id;

  await Usuario.destroy({ where: { id: id } });
  res.redirect('/listarUsu');
});

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
