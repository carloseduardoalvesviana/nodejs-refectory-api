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

  async auth(req, res) {
    const { email, password } = req.body;
    const response = await Teacher.findOne({ email: email }).findOne({ password: password });
    if (response) {
      return res.status(200).json(response);
    }

    return res.status(404).send('Usuário e/ou senha incorreto(s)');
  }

  async update(req, res) {
    const id = req.params.id;

    const {
      name,
      cpf,
      phone,
      email,
      code,
      city,
      state,
      rg
    } = req.body;

    const teacher = await Teacher.findOneAndUpdate({ _id: id },
      {
        name,
        cpf,
        phone,
        email,
        code,
        city,
        state,
        rg
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

    const teacherExists = await Teacher.findOne({ cpf: cpf });

    if (teacherExists) {
      return res.status(400).json({ message: 'Professor ja cadastrado' })
    }

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
