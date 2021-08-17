const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  description: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
