const express = require('express');
const MenuController = require('./controllers/MenuController');
const QrcodeController = require('./controllers/QrcodeController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'ok' })
})
routes.get('/qrcode', QrcodeController.index);
routes.post('/menu', MenuController.store);

module.exports = routes;
