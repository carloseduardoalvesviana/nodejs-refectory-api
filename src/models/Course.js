const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Course', CourseSchema);
