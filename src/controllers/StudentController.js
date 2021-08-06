const Student = require('../models/Student');

class StudentController {
  async index(req, res) {
    const response = await Student.find();
    return res.json(response);
  }
}

module.exports = new StudentController();
