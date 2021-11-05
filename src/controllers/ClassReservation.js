const ClassManagement = require('../models/ClassManagement');

class ClassController {
  async index(req, res) {
    const response = await ClassManagement.find().populate('teacher_id').populate('class_id').exec();
    return res.status(200).json(response);
  }

  async reservation(req, res) {
    try {
      const { teacher_id, class_id, data } = req.body;
      await ClassManagement.create({
        teacher_id, class_id, data
      });
      return res.status(201).json({ message: 'Agendamento marcado' });
    } catch (error) {
      return res.status(201).json({ message: 'Tivemos um problema!!' });
    }
  }
}

module.exports = new ClassController();