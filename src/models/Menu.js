const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
  title: String,
  description: String,
  date: String,
  type: String,
});

module.exports = mongoose.model('Menu', MenuSchema);