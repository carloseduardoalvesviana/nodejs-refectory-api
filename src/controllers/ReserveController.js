const ReserveModel = require('../models/Reserve');
const StudentModel = require('../models/Student');
const MenuModel = require('../models/Menu');

class ReserveController {
  async delete(req, res) {
    const { id } = req.params;
    const reserve = await ReserveModel.findOneAndDelete({ _id: id });
    return res.status(200).json(reserve);
  }

  async confirm(req, res) {
    const { id } = req.params;
    const reserve = await ReserveModel.findOneAndUpdate({ _id: id }, {
      approved: 'sim'
    });
    return res.status(200).json(reserve);
  }

  async disapprove(req, res) {
    const { id } = req.params;
    const reserve = await ReserveModel.findOneAndUpdate({ _id: id }, {
      approved: 'não'
    });
    return res.status(200).json(reserve);
  }

  async cancel(req, res) {
    const id = req.params.id;
    const { reason_for_cancellation } = req.body;

    const reserve = await ReserveModel.findOneAndUpdate(
      { _id: id },
      {
        cancel: true,
        reason_for_cancellation: reason_for_cancellation
      },
      { new: true }
    );

    const id_student = reserve.id_student;

    await StudentModel.findOneAndUpdate(
      { _id: id_student },
      { permission: 'não' },
      { new: true }
    );

    return res.status(200).json({
      message: "Reserva cancelada com sucesso!"
    });
  }

  async index(req, res) {
    const reserves =
      await ReserveModel.find({})
        .populate('id_menu')
        .populate({
          path: 'id_student',
          populate: {
            path: 'id_class',
            populate: {
              path: 'course'
            }
          }
        })
        .exec();

    return res.json(reserves);
  }

  async find(req, res) {
    const id_student = req.params.id;
    const id = req.body.id;
    const reserve = await ReserveModel.findOne(
      {
        id_student: id_student, id_menu: id
      }
    );

    return res.status(200).json(reserve);
  }

  async store(req, res) {
    const { id } = req.params; // id menu
    const id_student = req.body.id; // id student
    console.log(id_student);
    const student = await StudentModel.findOne({ _id: id_student });
    if (!student) {
      return res.json({ message: 'Estudante não encontrado(a)' });
    }

    const menu = await MenuModel.findOne({ _id: id });
    if (!menu) {
      return res.json({ message: 'Menu não encontrado' });
    }

    if (student.permission === "não") {
      return res.json({ message: 'Vocẽ não tem permissão' });
    }

    const response = await ReserveModel.create(
      {
        id_menu: id,
        id_student: id_student,
      }
    );

    return res.json(response);
  }
}

module.exports = new ReserveController();
