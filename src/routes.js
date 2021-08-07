const express = require('express');
const routes = express.Router();

const MenuController = require('./controllers/MenuController');
const PermissionController = require('./controllers/PermissionController');
const QrcodeController = require('./controllers/QrcodeController');
const StudentController = require('./controllers/StudentController');
const CsvController = require('./controllers/CsvController');

const { storage } = require('./helpers/csv');
const multer = require('multer');
const upload = multer({ storage: storage });

routes.get('/', (req, res) => res.json({ message: 'ok' }));
routes.post('/menu', MenuController.store);
routes.get('/menu', MenuController.index);
routes.put('/menu', MenuController.update);
routes.delete('/menu', MenuController.delete);

routes.post('/csv/import', upload.single('csv'), CsvController.read);

routes.get('/qrcode', QrcodeController.index);
routes.get('/students', StudentController.index);
routes.put('/students/permission/yes/:id', PermissionController.update);

module.exports = routes;
