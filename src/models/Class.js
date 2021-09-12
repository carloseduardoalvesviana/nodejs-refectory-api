const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassSchema = new Schema({
  shift: String,
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
  year: String,
  students: [
    {
      type: Schema.ObjectId,
      ref: 'Student'
    },
  ]
});

module.exports = mongoose.model('Class', ClassSchema);
