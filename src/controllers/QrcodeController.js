class QrCodeController {
  async index(req, res) {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let randomPassword;

    for (var i = 0; i < 16; i++) {
      randomPassword = randomPassword + chars.charAt(
        Math.floor(Math.random() * chars.length)
      );
    }

    return res.status(200).json(randomPassword);
  }
}

module.exports = new QrCodeController();
