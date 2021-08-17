const Teacher = require('../models/Teacher');

class TeacherController {
  async index(req, res) {
    const teachers = await Teacher.find({});
    return res.status(200).json(teachers);
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
      name, email, password, cpf, rg,
      phone, state, city, address, number, birth_date, cep
    })

    return res.status(200).json(teacher)
  }
}


module.exports = new TeacherController();
