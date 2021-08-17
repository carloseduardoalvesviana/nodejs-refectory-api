const mongoose = require('mongoose');
const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: String,
  email: String,
  password: String,
  cpf: String,
  rg: String,
  phone: String,
  state: String,
  city: String,
  address: String,
  number: String,
  birth_date: String,
  cep: String,
  permission: {
    type: String,
    default: 'professor'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', TeacherSchema);
