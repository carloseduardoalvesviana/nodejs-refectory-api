const mongoose = require('mongoose');
const { Schema } = mongoose;

const QrCodeSchema = new Schema({
  hour: String,
  key: String,
  data: String,
});

module.exports = mongoose.model('Qrcode', QrCodeSchema);
