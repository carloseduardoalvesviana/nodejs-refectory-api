const express = require('express');
const routes = express.Router();

const MenuController = require('./controllers/MenuController');
const PermissionController = require('./controllers/PermissionController');
const QrcodeController = require('./controllers/QrcodeController');
const StudentController = require('./controllers/StudentController');

routes.get('/', (req, res) => res.json({ message: 'ok' }));

routes.post('/menu', MenuController.store);
routes.get('/menu', MenuController.index);
routes.put('/menu', MenuController.update);

routes.get('/qrcode', QrcodeController.index);
routes.post('/student', StudentController.store);
routes.post('/permission', PermissionController.store);

module.exports = routes;
