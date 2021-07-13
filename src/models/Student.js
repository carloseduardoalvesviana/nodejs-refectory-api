const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: String,
  phone: Number,
  sex: String,
  address: String,
});

module.exports = mongoose.model('Student', StudentSchema);
