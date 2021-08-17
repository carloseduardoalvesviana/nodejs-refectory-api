const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: string,
  cpf: string,
  email: string,
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
