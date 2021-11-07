const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassReservationSchema = new Schema({
  class_id: {
    type: Schema.ObjectId,
    ref: 'Class'
  },
  teacher_id: {
    type: Schema.ObjectId,
    ref: 'Teacher'
  },
  approved: {
    type: String,
    default: 'não',
  },
  reason: String,
  data: String,
  quantidy: Number,
  studentsNot: {
    type: Array,
    default: [],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ClassReservation', ClassReservationSchema);