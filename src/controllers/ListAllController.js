const Student = require('../models/Student');

class ListAllController {
  async index(req, res) {
    const response = await Student.find();

    const turmas = [];

    response.map(r => {
      turmas.push(r.CURSO);
    })

    return res.json(turmas);
  }
}

module.exports = new ListAllController();
