const QrCodeModel = require('../models/QrCode');
var QRCode = require('qrcode')

class QrCodeController {
  async index(req, res) {
    // await QrCodeModel.create(req.body);
    QRCode.toString('I am a pony!', { type: 'svg' }, function (err, url) {
      return res.send(url);
    });
  }
}

module.exports = new QrCodeController();
