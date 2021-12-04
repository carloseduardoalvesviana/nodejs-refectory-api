const NotificationStudentLogin = require('../models/NotificationStudentLogin');

class NotificationStudentLoginController {
  async index(req, res) {
    try {
      const notifications = await NotificationStudentLogin.find().populate('id_student').exec();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async store(req, res) {
    try {
      const { id_student } = req.body;

      console.log(id_student);

      const NotificationStudentLogin = await NotificationStudentLogin.create({
        id_student: id_student
      });

      return res.status(200).json(NotificationStudentLogin);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new NotificationStudentLoginController();