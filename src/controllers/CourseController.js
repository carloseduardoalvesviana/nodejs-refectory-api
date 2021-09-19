const CourseSchema = require('../models/Course');

class CourseController {
  async get(req, res) {
    const courses = await CourseSchema.find();
    return res.json(courses);
  }

  async store(req, res) {
    const { name } = req.body;
    const course = await CourseSchema.create({
      name
    })
    return res.json(course);
  }
}

module.exports = new CourseController();
