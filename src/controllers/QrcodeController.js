class QrCodeController {

  async index(req, res) {
    var randomPassword = Math.random().toString(36).slice(-8);
    return res.status(200).json(randomPassword);
  }

}

module.exports = new QrCodeController();
