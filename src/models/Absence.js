const mongoose = require('mongoose');
const { Schema } = mongoose;

const AbsenseSchema = new Schema({
  id_user: String,
  name: String,
  code: Number,
  class: String,
  shift: String,
  year: String,
  reason: String,
});

module.exports = mongoose.model('Absense', AbsenseSchema);
