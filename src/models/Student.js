const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: String,
  cpf: String,
  phone: String,
  email: String,
  code: String,
  permission: {
    type: String,
    default: 'não'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);