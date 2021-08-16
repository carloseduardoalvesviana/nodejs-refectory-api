const Student = require('../models/Student');

class StudentController {
  async index(req, res) {
    const response = await Student.find();
    return res.json(response);
  }

  async store(req, res) {
    // cadastro de alunos manualmente
  }
}

module.exports = new StudentController();
