const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReserveSchema = new Schema({
  id_menu: {
    type: Schema.ObjectId,
    ref: 'Menu'
  },
  confirm: {
    type: String,
    default: 'não',
  },
  id_student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  approved: {
    type: String,
    default: 'não'
  },
  cancel: {
    type: Boolean,
    default: false,
  },
  reason_for_cancellation: {
    type: String,
    default: 'reserva não cancelada'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserve', ReserveSchema);