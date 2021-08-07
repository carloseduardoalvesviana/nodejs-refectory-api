const Student = require('../models/Student');

class SessionController {
  async store(req, res) {
    const { code } = req.body;
    const response = await Student.findOne({ MATRICULA: code });
    if (response) {
      return res.json(response);
    } else {
      return res.json({ message: 'Estudante não encontrado!' });
    }
  }
}

module.exports = new SessionController();
