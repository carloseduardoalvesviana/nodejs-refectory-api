const express = require('express');
const routes = express.Router();

const { storage } = require('./helpers/csv');
const multer = require('multer');
const upload = multer({ storage: storage });

const MenuController = require('./controllers/MenuController');
const PermissionController = require('./controllers/PermissionController');
const QrcodeController = require('./controllers/QrcodeController');
const StudentController = require('./controllers/StudentController');
const CsvController = require('./controllers/CsvController');
const ReserveController = require('./controllers/ReserveController');
const SessionController = require('./controllers/SessionController');

routes.get('/', (req, res) => res.json({ message: 'ok' }));
routes.post('/csv/import', upload.single('csv'), CsvController.read);
routes.post('/menu', MenuController.store);
routes.get('/menu', MenuController.index);
routes.put('/menu', MenuController.update);
routes.delete('/menu', MenuController.delete);
routes.get('/qrcode', QrcodeController.index);
routes.get('/students', StudentController.index);
routes.put('/students/permission/yes/:id', PermissionController.update);
routes.put('/students/permission/no/:id', PermissionController.updateNo);
routes.get('/menu/:id', MenuController.find);

routes.post('/menu/reserve/:id', ReserveController.store);
routes.post('/login', SessionController.store);

module.exports = routes;