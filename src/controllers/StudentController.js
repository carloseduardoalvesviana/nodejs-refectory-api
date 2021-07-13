const Student = require('../models/Student');

class StudentController {
  async store(req, res) {
    const response = await Student.create(req.body);
    return res.json(response);
  }
}

module.exports = new StudentController();
