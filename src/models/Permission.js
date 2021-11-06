const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
  id_student: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Permission', PermissionSchema);
