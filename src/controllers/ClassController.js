const ClassSchema = require('../models/Class');
const CourseSchema = require('../models/Course');

class ClassController {
  async index(req, res) {
    const classes = await ClassSchema.find()
      .populate('course')
      .exec();
    return res.status(200).json(classes);
  }

  async store(req, res) {
    const { shift, course, year } = req.body;

    const course_ = await CourseSchema.findOne({ id: course });

    const class_ = await ClassSchema.create({
      shift: shift,
      course: course_.id,
      year: year,
    });

    return res.json(class_);
  }
}

module.exports = new ClassController();
