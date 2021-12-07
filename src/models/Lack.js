const mongoose = require("mongoose");
const { Schema } = mongoose;

const LackSchema = new Schema(
  {
    id_student: {
      type: Schema.ObjectId,
      ref: "Student",
    },
    id_reserve: {
      type: Schema.ObjectId,
      ref: "Reserve",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lack", LackSchema);
