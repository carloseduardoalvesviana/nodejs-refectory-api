var QRCode = require('qrcode')
const { parseISO } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');

class QrCodeController {
  async index(req, res) {

    let date = new Date();
    /*
    let dateParser = parseISO(date);
    const newDate = zonedTimeToUtc(dateParser, 'America/Sao_Paulo');

    console.log(newDate);
    */

    QRCode.toDataURL(`${date}`, { type: 'svg' }, function (err, url) {
      return res.send(url);
    });
  }
}

module.exports = new QrCodeController();
