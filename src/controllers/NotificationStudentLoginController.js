const NotificationStudentLogin = require('../models/NotificationStudentLogin');

class NotificationStudentLoginControllerController {
  async index(req, res) {
    const notifications = await NotificationStudentLogin.find({});
    return res.status(200).json(notifications);
  }

  async create(req, res) {
    const { id_student } = req.body;

    const NotificationStudentLogin = await NotificationStudentLogin.create({
      id_student,
    });

    return res.status(200).json(NotificationStudentLogin);
  }
}

module.exports = new NotificationStudentLoginControllerController();