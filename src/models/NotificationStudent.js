const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationStudent = new Schema({
  id_student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  message: {
    type: String,
    default: 'Sua presenca foi confirmada'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NotificationStudent', NotificationStudent);
