const Teacher = require('../models/Teacher');

class TeacherController {
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

    await Teacher.create({
      name, email, password, cpf, rg,
      phone, state, city, address, number, birth_date, cep
    })
  }
}


module.exports = new TeacherController();
