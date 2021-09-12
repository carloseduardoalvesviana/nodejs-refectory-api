const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: String,
  cpf: String,
  phone: String,
  email: String,
  permission: {
    type: String,
    default: 'professor'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', TeacherSchema);
