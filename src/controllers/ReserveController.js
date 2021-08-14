const ReserveModel = require('../models/Reserve');
const StudentModel = require('../models/Student');

class ReserveController {
  async index(req, res) {
    const reserves =
      await ReserveModel.find({})
        .populate('id_menu')
        .populate('id_student')
        .exec();

    return res.json(reserves);
  }

  async find(req, res) {
    const id_student = req.params.id;
    const id = req.body.id;

    console.log(id_student, id);

    const reserve = await ReserveModel.findOne({ 
      id_student: id_student,
      id_menu: id
    });

    return res.status(200).json(reserve);
  }

  async store(req, res) {
    const { id } = req.params;
    const id_student = req.body.id;

    console.log(id, id_student);

    const student = await StudentModel.findOne({ _id: id_student });

    // if (student.permission === 'não') {
    //   return res.json({ message: 'Voçe não tem permissão' });
    // }

    const response = await ReserveModel.create({
      id_menu: id,
      id_student: id_student,
    });

    return res.json(response);
  }
}

module.exports = new ReserveController();
