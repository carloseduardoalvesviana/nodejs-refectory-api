const express = require('express');
const MenuController = require('./controllers/MenuController');

const routes = express.Router();

routes.post('/menu', MenuController.store);

module.exports = routes;
