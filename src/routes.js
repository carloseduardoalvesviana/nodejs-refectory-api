const express = require("express");
const routes = express.Router();

const { storage } = require("./helpers/csv");
const multer = require("multer");
const upload = multer({ storage: storage });

const NotificationStudentController = require("./controllers/NotificationStudentController");
const MenuController = require("./controllers/MenuController");
const PermissionController = require("./controllers/PermissionController");
const QrcodeController = require("./controllers/QrcodeController");
const StudentController = require("./controllers/StudentController");
const CsvController = require("./controllers/CsvController");
const ReserveController = require("./controllers/ReserveController");
const SessionController = require("./controllers/SessionController");
const MessageController = require("./controllers/MessageController");
const TeacherController = require("./controllers/TeacherController");
const CourseController = require("./controllers/CourseController");
const ClassController = require("./controllers/ClassController");
const AdminController = require("./controllers/AdminController");
const ClassReservation = require("./controllers/ClassReservation");
const LackController = require("./controllers/LackController");
var { checkPermission } = require("./middleware/permission");

// Entry point API
routes.get("/node", (req, res) => res.json({ message: "Welcome to api" }));

routes.put("/node/verificar/update", NotificationStudentController.update);
routes.get("/node/verificar_presenca", NotificationStudentController.index);
routes.post("/node/verificar/presenca", NotificationStudentController.store);

// Class - turmas
routes.post("/node/class", ClassController.store);
routes.get("/node/class", ClassController.index);
routes.get("/node/students/class/:id_class", ClassController.getStudents);
routes.delete("/node/class/:id", ClassController.delete);
routes.get("/node/class/:id", ClassController.findOne);
routes.put("/node/class/:id", ClassController.update);

// Class - agendamento
routes.put("/node/reservations/disapprove/:id", ClassReservation.disapprove);
routes.post("/node/class/reservation", ClassReservation.reservation);
routes.get("/node/reservations", ClassReservation.index);
routes.put("/node/reservations/:id", ClassReservation.update);
routes.get(
  "/node/reservations/:id",
  ClassReservation.getReservastionByTeacherId
);
routes.delete("/node/reservations/:id", ClassReservation.delete);

routes.get("/node/reservationDetail/:id", ClassReservation.reservationDetail);
routes.put(
  "/node/reservations/class/students/:id",
  ClassReservation.addStudents
);

// Class admin
routes.post(
  "/node/admin/class/reservation",
  ClassReservation.adminReservationStore
);
routes.get(
  "/node/admin/reservations/:id",
  ClassReservation.getReservastionByAdminId
);
routes.put(
  "/node/admin/reservations/class/:id",
  ClassReservation.addStudentsAdmin
);
routes.delete(
  "/node/admin/reservations/class/:id",
  ClassReservation.deleteAdmin
);

// Course
routes.post("/node/courses", CourseController.store);
routes.get("/node/courses", CourseController.get);
routes.delete("/node/courses/:id", CourseController.delete);
routes.put("/node/courses/:id", CourseController.update);
routes.get("/node/courses/:id", CourseController.findOne);

// Login
routes.post("/node/login/student", SessionController.auth);
routes.post("/node/auth/professor", TeacherController.auth);
routes.post("/node/auth/admin", AdminController.auth);

//
routes.get("/node/students/found", StudentController.findNotConfirm);

// Message
routes.post("/node/message", MessageController.store);

// Menu
routes.post("/node/menu", MenuController.store);
routes.get("/node/menu", MenuController.findMenuOfDay);
routes.get("/node/menu/all", MenuController.index);
routes.put("/node/menu", MenuController.update);
routes.delete("/node/menu", MenuController.delete);
routes.get("/node/menu/:id", MenuController.findOne);

// Qrcode
routes.get("/node/qrcode", QrcodeController.index);
routes.post("/node/qrcode/reserve/:id", QrcodeController.confirm);

// Permissions
routes.put("/node/students/permission/yes/:id", PermissionController.update);
routes.put("/node/students/permission/no/:id", PermissionController.updateNo);

// Students
routes.get("/node/students", StudentController.index);
routes.put("/node/students/:id", StudentController.update);
routes.get("/node/students/:id", StudentController.findOne);
routes.delete("/node/students/:id", StudentController.delete);
routes.get("/node/students/class/:id", StudentController.findStudentByClass);
routes.post("/node/students", StudentController.store);

// ######
routes.post("/node/unlock_student", StudentController.unlockStudent);
routes.post("/node/lock_student", StudentController.lockStudent);
// ######

routes.put("/node/reservations/student/:id", ReserveController.confirm);
routes.put(
  "/node/reservations/student/disapprove/:id",
  ReserveController.disapprove
);
routes.delete("/node/reservations/student/:id", ReserveController.delete);

// Teachers
routes.post("/node/teachers", TeacherController.store);
routes.get("/node/teachers", TeacherController.index);
routes.put("/node/teachers/:id", TeacherController.update);
routes.delete("/node/teachers/:id", TeacherController.delete);
routes.get("/node/teachers/:id", TeacherController.findOne);

// Admins
routes.post("/node/admin/store", AdminController.store);
routes.get("/node/admins/index", AdminController.index);
routes.put("/node/admin/update/:id", AdminController.update);
routes.delete("/node/admin/delete/:id", AdminController.delete);
routes.get("/node/admin/find/:id", AdminController.findOne);

//nutricionistas
routes.get("/node/nutricionistas", AdminController.nutricionistas);
routes.get("/node/nutricionista/:id", AdminController.findNutri);

// Import Student
routes.post("/node/csv/import", upload.single("csv"), CsvController.read);

// Reserves
routes.post("/node/menu/reserve/:id", ReserveController.store);
routes.put("/node/reserves/cancel/:id", ReserveController.cancel);
routes.post("/node/reserves/find/:id", ReserveController.find);
routes.get("/node/reserves", ReserveController.index);

routes.get("/node/lacks", LackController.index);
routes.post("/node/lacksFilter", LackController.teste);
routes.get("/node/job_lacks", LackController.jobLack);

// listen
module.exports = routes;
