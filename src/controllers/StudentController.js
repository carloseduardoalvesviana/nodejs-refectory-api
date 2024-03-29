const Student = require("../models/Student");
const ReserveModel = require("../models/Reserve");

class StudentController {
  async findStudentByClass(req, res) {
    const { id } = req.params;
    console.log(id);
    const students = await Student.find({ id_class: id });
    return res.status(200).json(students);
  }

  async index(req, res) {
    try {
      const response = await Student.find()
        .populate({
          path: "id_class",
          populate: {
            path: "course",
          },
        })
        .exec();
      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findNotConfirm(req, res) {
    const reserves = await ReserveModel.find({ confirm: "não" });

    let students = [];

    reserves.map((r) => {
      students.push(r.id_student);
    });

    const studentsFound = await Student.find({
      _id: students,
    });

    return res.json(studentsFound);
  }

  async findOne(req, res) {
    const id = req.params.id;
    const student = await Student.findOne({ _id: id });
    return res.status(200).json(student);
  }

  async update(req, res) {
    const id = req.params.id;

    const { name, cpf, phone, email } = req.body;

    const student = await Student.findOneAndUpdate(
      { _id: id },
      {
        name,
        cpf,
        phone,
        email,
      },
      { new: true }
    );

    return res.status(200).json(student);
  }

  async unlockStudent(req, res) {
    try {
      const id = req.body.id_student;
      console.log(id);

      const student = await Student.findOne({ _id: id });

      // desbloqueia o aluno e zera a quantidade de faltas
      // obs o campo lack é somente pra controlar o bloqueio
      // caso queira fazer relatorio com a quantidade de faltas reais do aluno
      // existe um model chamado lack e parti dali.
      // show de bola
      if (student.lack >= 3) {
        await Student.findOneAndUpdate(
          { _id: id },
          {
            lack: 0,
            bloqued: false,
            countBloqued: student.countBloqued + 1,
          },
          { new: true }
        );

        return res.status(200).json("Estudante desbloqueado!");
      }

      await Student.findOneAndUpdate(
        { _id: id },
        {
          bloqued: false,
        },
        { new: true }
      );

      return res.status(200).json("Estudante desbloqueado, sobe surpervisão.");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async lockStudent(req, res) {
    try {
      const id = req.body.id_student;
      const student = await Student.findOne({ _id: id });

      await Student.findOneAndUpdate(
        { _id: id },
        {
          bloqued: true,
        },
        { new: true }
      );

      return res.status(200).json("Estudante bloqueado, sobe surpervisão.");
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await Student.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .json({ message: "Estudante Deletado com sucesso!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req, res) {
    const { name, cpf, phone, email, code, id } = req.body;

    let student = await Student.create({
      name,
      cpf,
      phone,
      email,
      code,
      id_class: id,
    });

    return res.status(200).json(student);
  }
}

module.exports = new StudentController();
