const Student = require('../models/Student');

class ListAllController {
  async index(req, res) {
    const response = await Student.find();

    const turmas = [];

    response.map(r => {
      turmas.push(r.CURSO);
    })

    const arrUnique = [...new Set(turmas)];

    return res.json(arrUnique);
  }
}

module.exports = new ListAllController();
