const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassSchema = new Schema({
  shift: String,
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
  year: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Class', ClassSchema);
