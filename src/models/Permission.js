const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
  id_student: String,
});

module.exports = mongoose.model('Permission', PermissionSchema);
