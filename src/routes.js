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

// Menu
routes.post('/menu', MenuController.store);
routes.get('/menu', MenuController.findMenuOfDay);
routes.get('/menu/all', MenuController.index);
routes.put('/menu', MenuController.update);
routes.delete('/menu', MenuController.delete);
routes.get('/menu/:id', MenuController.findOne);

// Qrcode
routes.get('/qrcode', QrcodeController.index);
routes.post('/qrcode/reserve/:id', QrcodeController.confirm);

// Permissions
routes.put('/students/permission/yes/:id', PermissionController.update);
routes.put('/students/permission/no/:id', PermissionController.updateNo);

// Students
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students/:id', StudentController.findOne);
routes.delete('/students/:id', StudentController.delete);

// Reserves
routes.post('/menu/reserve/:id', ReserveController.store);
routes.put('/reserves/cancel/:id', ReserveController.cancel);
routes.post('/reserves/find/:id', ReserveController.find);
routes.get('/reserves', ReserveController.index);

routes.post('/login', SessionController.store);

routes.post('/message', MessageController.store);

module.exports = routes;
