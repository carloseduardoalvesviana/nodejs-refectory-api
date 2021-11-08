const Student = require('../models/Student');

class SessionController {
  async auth(req, res) {
    const { code } = req.body;
    const response = await Student.findOne({ code: code });
    return res.status(200).json(response);
  }

}

module.exports = new SessionController();