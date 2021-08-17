const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: String,
  email: String,
  cpf: String,
  phone: String,
  state: String,
  city: String,
  address: String,
  permission: {
    type: String,
    default: 'professor'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
