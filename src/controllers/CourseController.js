const CourseSchema = require('../models/Course');

class CourseController {
  async store(req, res) {
    const { name } = req.body;
    const course = await CourseSchema.create({
      name
    })
    return res.json(course);
  }
}

module.exports = new CourseController();
