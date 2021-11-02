const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: String,
  cpf: String,
  phone: String,
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
    default: 'admin'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
