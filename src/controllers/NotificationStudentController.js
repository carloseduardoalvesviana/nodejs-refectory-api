const NotificationStudent = require("../models/NotificationStudent");

class NotificationStudentController {
  async index(req, res) {
    try {
      const notifications = await NotificationStudent.find()
        .populate("id_student")
        .exec();
      let response = {
        ...notifications[notifications.length - 1],
        index: notifications.length,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async store(req, res) {
    try {
      const { id_student } = req.body;

      console.log(id_student);

      const NotificationStudents = await NotificationStudent.create({
        id_student,
      });

      console.log(NotificationStudents);

      return res.status(200).json(NotificationStudents);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new NotificationStudentController();
