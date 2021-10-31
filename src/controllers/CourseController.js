const CourseSchema = require('../models/Course');

class CourseController {
  async get(req, res) {
    const courses = await CourseSchema.find();
    return res.json(courses);
  }

  async findOne(req, res) {
    const id = req.params.id;
    const course = await CourseSchema.findOne({ _id: id });
    return res.status(200).json(course);
  }

  async store(req, res) {
    const { name } = req.body;
    const course = await CourseSchema.create({
      name
    })
    return res.json(course);
  }

  async delete(req, res) {
    const { id } = req.params;
    const r = await CourseSchema.findOneAndDelete({ _id: id });
    return res.json(r);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const r = await CourseSchema.findOneAndUpdate({ _id: id }, { name: name }, { new: true });
    return res.json(r);
  }
}

module.exports = new CourseController();
