const ClassReservation = require('../models/ClassReservation');
const Student = require('../models/Student');

class ClassReservationController {
  async update(req, res) {
    const { id } = req.params;
    await ClassReservation.findOneAndUpdate({ _id: id }, { approved: 'sim' }, { new: true });
    return res.status(200).json({ message: 'atualizado com sucesso!' });
  }

  async getReservastionByTeacherId(req, res) {
    const { id } = req.params;
    const reservationsTeacher = await ClassReservation.find({
      teacher_id: id
    }).populate({
      path: 'class_id',
      populate: {
        path: 'course'
      }
    })
      .populate('teacher_id')
      .exec();
    return res.status(200).json(reservationsTeacher);
  }

  async reservationDetail(req, res) {
    const { id } = req.params;
  
    const idStudents = await ClassReservation.findOne({ _id: id }).distinct('studentsNot');

    const studentsNot = await Student.find().where('_id').in(idStudents).exec();

    res.status(200).json(studentsNot);
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

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ClassReservation.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: 'deletado com sucesso' });
    } catch (error) {
      return res.status(201).json({ message: 'Tivemos um problema!!' });
    }
  }

  async reservation(req, res) {
    try {
      const { teacher_id, class_id, data, studentsNot } = req.body;
      await ClassReservation.create({
        teacher_id, class_id, data, studentsNot
      });
      return res.status(201).json({ message: 'Agendamento marcado' });
    } catch (error) {
      return res.status(201).json({ message: 'Tivemos um problema!!' });
    }
  }
}

module.exports = new ClassReservationController();