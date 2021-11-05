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
    type: Boolean,
    default: false,
  },
  reason: String,
  data: String,
});

module.exports = mongoose.model('ClassReservation', ClassReservationSchema);