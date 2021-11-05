const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);
