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

  async update(req, res) {
    const { id } = req.params;
    const { shift, year } = req.body;
    const r = await ClassSchema.findOneAndUpdate({ _id: id }, {
      shift, year
    });
    return res.json(r);
  }

  async findOne(req, res) {
    const id = req.params.id;
    const classes = await ClassSchema.findOne({ _id: id });
    return res.status(200).json(classes);
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