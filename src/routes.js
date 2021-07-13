const express = require('express');
const MenuController = require('./controllers/MenuController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'ok' })
})

routes.post('/menu', MenuController.store);

module.exports = routes;
