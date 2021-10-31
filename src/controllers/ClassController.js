const ClassSchema = require('../models/Class');
const CourseSchema = require('../models/Course');

class ClassController {
  async index(req, res) {
    const classes = await ClassSchema.find().populate('course').exec();
    return res.status(200).json(classes);
  }

  async delete(req, res) {
    const { id } = req.params;
    const r = await ClassSchema.findOneAndDelete({ _id: id });
    return res.json(r);
  }

  async store(req, res) {
    const { shift, course, year } = req.body;
    const course_ = await CourseSchema.findOne({ _id: course });
    const class_ = await ClassSchema.create({
      shift: shift,
      course: course_._id,
      year: year,
    });
    return res.json(class_);
  }
}

module.exports = new ClassController();