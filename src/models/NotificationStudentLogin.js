const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationStudentLoginSchema = new Schema({
  id_student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  msg: {
    type: String,
    default: 'Sua presença foi confirmada!'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NotificationStudentLogin', NotificationStudentLoginSchema);
