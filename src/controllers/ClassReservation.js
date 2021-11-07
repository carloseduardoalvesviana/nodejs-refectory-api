const ClassReservation = require('../models/ClassReservation');

class ClassReservationController {
  async update(req, res) {
    const { id } = req.params;
    await ClassReservation.findOneAndUpdate({ _id: id }, { approved: 'sim' }, { new: true });
    return res.status(200).json({ message: 'atualizado com sucesso!' });
  }

  async addStudents(req, res) {
    const { id_reservation } = req.params;
    const { id_student } = req.body;

    console.log(id_student);
    
    await ClassReservation.findOneAndUpdate({ _id: id_reservation }, 
      {
        $push: {
          students: id_student
        }
      }
    );
  }

  async disapprove(req, res) {
    const { id } = req.params;
    await ClassReservation.findOneAndUpdate({ _id: id }, { approved: 'não' }, { new: true });
    return res.status(200).json({ message: 'reserva desaprovada' });
  }

  async getReservastionByTeacherId(req, res) {
    const { id } = req.params;
    console.log(id);
    const reservationsTeacher = await ClassReservation.find({
      teacher_id: id
    }).populate({
      path: 'class_id',
      populate: {
        path: 'course'
      }
    })
      .populate('teacher_id')
      .populate('students')
      .exec();
    return res.status(200).json(reservationsTeacher);
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
      .populate('students')
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
      const { teacher_id, class_id, data = '' } = req.body;
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