const Reserve = require('../models/Reserve');

class QrCodeController {
  async confirm(req, res) {
    let id_reserve = req.params.id;
    let qrcode = req.body.qrcode;

    if(!qrcode) {
      return res.status(400).json({ message: 'no token provider' });
    }

    await Reserve.findOneAndUpdate({ _id: id_reserve }, { confirm: 'sim' }, { new: true });
    
    return res.json({ message: "Reserva confirmada!" });
  }

  async index(req, res) {
    var randomPassword = Math.random().toString(36).slice(-8);
    return res.status(200).json(randomPassword);
  }

}

module.exports = new QrCodeController();
