const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: String,
  img: String,
  phone: Number,
  code: String,
  sex: String,
  address: String,
});

module.exports = mongoose.model('Student', StudentSchema);
