const ClassReservation = require('../models/ClassReservation');

class ClassReservationController {
  async update(req, res) {
    const { id } = req.params;
    await ClassReservation.findOneAndUpdate({ _id: id }, { approved: 'sim' }, { new: true });
    return res.status(200).json({ message: 'atualizado com sucesso!' });
  }

  async index(req, res) {
    const reservations = await ClassReservation.find({})
      .populate({
        path: 'class_id',
        populate: {
          path: 'course'
        }
      })
      .populate('teacher_id')
      .exec();
    return res.status(200).json(reservations);
  }

  async reservation(req, res) {
    try {
      const { teacher_id, class_id, data } = req.body;
      console.log(req.body);
      await ClassReservation.create({
        teacher_id, class_id, data
      });
      return res.status(201).json({ message: 'Agendamento marcado' });
    } catch (error) {
      return res.status(201).json({ message: 'Tivemos um problema!!' });
    }
  }
}

module.exports = new ClassReservationController();