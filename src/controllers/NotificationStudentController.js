const NotificationStudent = require("../models/NotificationStudent");

class NotificationStudentController {
  async index(req, res) {
    try {
      const notifications = await NotificationStudent.find()
        .populate("id_student")
        .exec();

      return res.status(200).json(notifications[notifications.length - 1]);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const id_student = req.body.id_student;

    try {
      const notifications = await NotificationStudent.findOneAndUpdate(
        {
          id_student,
        },
        { ready: true }
      );

      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async store(req, res) {
    try {
      const { id_student } = req.body;
      const notifications = await NotificationStudent.find();

      if (notifications.length > 0) {
        const notificationUpdate = await NotificationStudent.findOneAndUpdate(
          { _id: notifications[0]._id },
          {
            id_student,
            ready: false,
          }
        );
        return res.status(200).json(notificationUpdate);
      }

      const NotificationStudents = await NotificationStudent.create({
        id_student,
      });

      return res.status(200).json(NotificationStudents);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new NotificationStudentController();
