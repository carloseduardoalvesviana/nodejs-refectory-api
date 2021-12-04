const NotificationStudentLogin = require('../models/NotificationStudentLogin');

class NotificationStudentLoginControllerController {
  async index(req, res) {
    try {
      const notifications = await NotificationStudentLogin.find().populate('id_student').exec();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json(error);
    }
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