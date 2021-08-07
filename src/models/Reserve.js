const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReserveSchema = new Schema({
  id_menu: {
    type: Schema.ObjectId,
    ref: 'Menu'
  },
  id_student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  approved: {
    type: String,
    default: 'não'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserve', ReserveSchema);