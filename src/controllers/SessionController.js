const Student = require('../models/Student');

class SessionController {
  async store(req, res) {
    const { code } = req.body;
    console.log(code);
    const response = await Student.findOne({ MATRICULA: code });
    return res.json(response);
  }
}

module.exports = new SessionController();
