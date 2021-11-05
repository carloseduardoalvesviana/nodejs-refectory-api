const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassManagementSchema = new Schema({
  class_id: {
    type: Schema.ObjectId,
    ref: 'Class'
  },
  teacher_id: {
    type: Schema.ObjectId,
    ref: 'Teacher'
  },
  approved: {
    type: Boolean,
    default: false,
  },
  reason: String,
  data: String,
});

module.exports = mongoose.model('ClassManagement', ClassManagementSchema);