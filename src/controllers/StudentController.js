const Student = require('../models/Student');
const ReserveModel = require('../models/Reserve');
const ClassModel = require('../models/Class');

class StudentController {
  async index(req, res) {
    const response = await Student.find();
    return res.json(response);
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
      code,
    } = req.body;

    const student = await Student.findOneAndUpdate({ _id: id }, {
      name,
      cpf,
      phone,
      email,
      code,
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
      id,
    } = req.body;

    let student = await Student.create({
      name,
      cpf,
      phone,
      email,
      code,
    });

    await ClassModel.findOneAndUpdate({ _id: id }, {
      $push: {
        students: student._id
      }
    }, { new: true });

    return res.status(200).json(student);
  }
}

module.exports = new StudentController();
