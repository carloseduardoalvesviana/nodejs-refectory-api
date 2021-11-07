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
const TeacherController = require('./controllers/TeacherController');
const CourseController = require('./controllers/CourseController');
const ClassController = require('./controllers/ClassController');
const AdminController = require('./controllers/AdminController');
// const ClassManagementController = require('./controllers/ClassManagementController');
const ClassReservation = require('./controllers/ClassReservation');

// Entry point API
routes.get('/', (req, res) => res.json({ message: 'Welcome to api' }));

// Class - turmas
routes.post('/class', ClassController.store);
routes.get('/class', ClassController.index);
routes.delete('/class/:id', ClassController.delete);
routes.get('/class/:id', ClassController.findOne);
routes.put('/class/:id', ClassController.update);

// Class - agendamento
routes.put('/reservations/disapprove/:id', ClassReservation.disapprove);
routes.post('/class/reservation', ClassReservation.reservation);
routes.get('/reservations', ClassReservation.index);
routes.put('/reservations/:id', ClassReservation.update)
routes.get('/reservations/:id', ClassReservation.getReservastionByTeacherId);
routes.delete('/reservations/:id', ClassReservation.delete);

// adiconar alunos
routes.put('/reservations/class/students/:id_reservation', ClassReservation.addStudents);

// Class - turmas
// routes.post('/classManagement', ClassManagementController.store);
// routes.get('/classManagement/create', ClassManagementController.create);
// routes.get('/classManagement', ClassManagementController.index);
// routes.get('/classManagements/:teacher_id', ClassManagementController.classManagements);
// routes.delete('/class/:id', ClassManagementController.delete);
// routes.get('/class/:id', ClassManagementController.findOne);
// routes.put('/class/:id', ClassManagementController.update);

// Course
routes.post('/courses', CourseController.store);
routes.get('/courses', CourseController.get);
routes.delete('/courses/:id', CourseController.delete);
routes.put('/courses/:id', CourseController.update);
routes.get('/courses/:id', CourseController.findOne);


// Login
routes.post('/login', SessionController.store);
routes.post('/auth/professor', TeacherController.auth);
routes.post('/auth/admin', AdminController.auth);
routes.get('/students/found', StudentController.findNotConfirm);

// Message
routes.post('/message', MessageController.store);

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
routes.get('/students/class/:id', StudentController.findStudentByClass);

// Teachers
routes.post('/teachers', TeacherController.store);
routes.get('/teachers', TeacherController.index);
routes.put('/teachers/:id', TeacherController.update);
routes.delete('/teachers/:id', TeacherController.delete);
routes.get('/teachers/:id', TeacherController.findOne);

// Admins
routes.post('/admin/store', AdminController.store);
routes.get('/admins/index', AdminController.index);
routes.put('/admin/update/:id', AdminController.update);
routes.delete('/admin/delete/:id', AdminController.delete);
routes.get('/admin/find/:id', AdminController.findOne);

// Import Student
routes.post('/csv/import', upload.single('csv'), CsvController.read);

// Reserves
routes.post('/menu/reserve/:id', ReserveController.store);
routes.put('/reserves/cancel/:id', ReserveController.cancel);
routes.post('/reserves/find/:id', ReserveController.find);
routes.get('/reserves', ReserveController.index);

// listen

module.exports = routes;
