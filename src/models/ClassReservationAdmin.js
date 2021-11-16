const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassReservationAdminSchema = new Schema({
  class_id: {
    type: Schema.ObjectId,
    ref: 'Class'
  },
  students: [
    {
      type: Schema.ObjectId,
      ref: 'Student',
    }
  ],
  admin_id: {
    type: Schema.ObjectId,
    ref: 'Admin'
  },
  approved: {
    type: String,
    default: 'sim',
  },
  reason: String,
  data: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('ClassReservationAdmin', ClassReservationAdminSchema);
