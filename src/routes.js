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
const MessageController = require('./controllers/MessageController');

routes.get('/', (req, res) => res.json({ message: 'Welcome to IFPI API' }));
routes.post('/csv/import', upload.single('csv'), CsvController.read);

routes.post('/menu', MenuController.store);
routes.get('/menu', MenuController.findMenuOfDay);
routes.get('/menu/all', MenuController.index);
routes.put('/menu', MenuController.update);
routes.delete('/menu', MenuController.delete);
routes.get('/menu/:id', MenuController.findOne);

routes.get('/qrcode', QrcodeController.index);
routes.post('/qrcode/reserve/:id', QrcodeController.confirm);

routes.get('/students', StudentController.index);
routes.put('/students/permission/yes/:id', PermissionController.update);
routes.put('/students/permission/no/:id', PermissionController.updateNo);
routes.post('/students', StudentController.store);

routes.post('/menu/reserve/:id', ReserveController.store);
routes.put('/reserves/cancel/:id', ReserveController.cancel);
routes.get('/reserves', ReserveController.index);
routes.post('/login', SessionController.store);
routes.post('/reserves/find/:id', ReserveController.find);

routes.post('/message', MessageController.store);

module.exports = routes;
