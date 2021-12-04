const Student = require('../models/Student');

class SessionController {
  async auth(req, res) {
    try {
      const { code } = req.body;
      const response = await Student.findOne({ code: code });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error);
    }

  }

}

module.exports = new SessionController();