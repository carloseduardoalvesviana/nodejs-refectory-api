const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    name: String,
    cpf: String,
    phone: String,
    email: String,
    code: String,
    id_class: {
      type: Schema.ObjectId,
      ref: "Class",
    },
    permission: {
      type: String,
      default: "não",
    },
    bloqued: {
      type: Boolean,
      default: false,
    },
    lack: {
      type: Number,
      default: 0,
    },
    countBloqued: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
