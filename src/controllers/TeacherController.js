const Teacher = require('../models/Teacher');

class TeacherController {
  async index(req, res) {
    const teachers = await Teacher.find({});
    return res.status(200).json(teachers);
  }

  async findOne(req, res) {
    const id = req.params.id;
    const teacher = await Teacher.findOne({ _id: id });
    return res.status(200).json(teacher);
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

    const teacher = await Teacher.findOneAndUpdate({ _id: id },
      {
        name,
        cpf,
        phone,
        email,
        code,
      }, { new: true });

    return res.status(200).json(teacher);
  }

  async store(req, res) {
    const {
      name,
      email,
      password,
      cpf,
      rg,
      phone,
      state,
      city,
      address,
      number,
      birth_date,
      cep,
    } = req.body;

    const teacher = await Teacher.create({
      name,
      email,
      password,
      cpf,
      rg,
      phone,
      state,
      city,
      address,
      number,
      birth_date,
      cep,
    })

    return res.status(200).json(teacher)
  }

  async delete(req, res) {
    const id = req.params.id;
    await Teacher.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: 'Professor deletado com sucesso!' });
  }
}

module.exports = new TeacherController();
