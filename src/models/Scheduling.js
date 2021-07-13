const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchedulingSchema = new Schema({
  date: String,
  id_student: String,
  id_menu: String,
  success: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Scheduling', SchedulingSchema);