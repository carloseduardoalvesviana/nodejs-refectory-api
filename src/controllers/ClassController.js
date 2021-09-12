const ClassSchema = require('../models/Class');

class ClassController {
  async index(req, res) {
    const classes = await ClassSchema.find().populate('course')
      .populate('students')
      .exec();
    return res.status(200).json(classes);
  }
  async store(req, res) {
    const { shift, course, year } = req.body;

    const class_ = await ClassSchema.create({
      shift: shift,
      course: course,
      year: year,
    });

    return res.json(class_);
  }
}

module.exports = new ClassController();
