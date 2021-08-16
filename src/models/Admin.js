const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: string,
  cpf: string,
  email: string,
});

module.exports = mongoose.model('Student', StudentSchema);
