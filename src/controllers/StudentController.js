const Student = require('../models/Student');
const ReserveModel = require('../models/Reserve');

class StudentController {
  async index(req, res) {
    try {
      const response = await Student.find().populate({
        path: 'id_class',
        populate: {
          path: 'course'
        }
      }).exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findNotConfirm(req, res) {
    const reserves = await ReserveModel.find({ confirm: "não" });

    let students = [];

    reserves.map(r => {
      students.push(
        r.id_student
      );
    });

    const studentsFound = await Student.find({
      _id: students
    })

    return res.json(studentsFound);
  }

  async findOne(req, res) {
    const id = req.params.id;
    const student = await Student.findOne({ _id: id });
    return res.status(200).json(student);
  }

  async update(req, res) {
    const id = req.params.id;

    const {
      name,
      cpf,
      phone,
      email,
    } = req.body;

    const student = await Student.findOneAndUpdate({ _id: id }, {
      name,
      cpf,
      phone,
      email,
    }, { new: true });

    return res.status(200).json(student);
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await Student.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: 'Estudante Deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req, res) {
    const {
      name,
      cpf,
      phone,
      email,
      code,
      id_class,
    } = req.body;

    let student = await Student.create({
      name,
      cpf,
      phone,
      email,
      code,
      id_class
    });

    return res.status(200).json(student);
  }
}

module.exports = new StudentController();
