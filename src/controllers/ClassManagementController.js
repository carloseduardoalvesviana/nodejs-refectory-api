const ClassManagementSchema = require('../models/ClassManagement');
const ClassSchema = require('../models/Class');
const Teacher = require('../models/Teacher');

class ClassManagementController {
  async index(req, res) {
    const classManagement = await ClassManagementSchema.find({}).populate(
    [{
        path: 'class_id',
        model: 'Class'
    }, {
        path: 'teacher_id',
        model: 'Teacher',
    }])    
    .exec();
    return res.status(200).json(classManagement);
      
  }  
    
  async create(req, res) {
    const classes = await ClassSchema.find({});
    const teachers = await Teacher.find({});
      
    return res.status(200).json({ teachers: teachers, classes: classes });
  }
    
  async store(req, res) {
    const { class_id, teacher_id } = req.body;
      
    const classManagement = await ClassManagementSchema.create({
      class_id: class_id,
      teacher_id: teacher_id,
    });
      
    return res.json(classManagement);
  }
    
  async classManagements(req, res) {
    const teacher_id = req.params.teacher_id;
    
    const classesId = await ClassManagementSchema.find({ teacher_id: teacher_id })
        .distinct("class_id");
      
    const classes = await ClassSchema.find().populate('course').where('_id').in(classesId).exec();
    console.log(classes);
  
  }
}

module.exports = new ClassManagementController();