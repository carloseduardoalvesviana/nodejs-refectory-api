const mongoose = require('mongoose');
const { Schema } = mongoose;

const MenuSchema = new Schema({
  title: String,
  description: String,
  date: String,
  type: String,
  deadline: {
    type: String,
    default: '10'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', MenuSchema);