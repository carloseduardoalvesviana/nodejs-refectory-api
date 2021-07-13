var QRCode = require('qrcode')
const { parseISO } = require('date-fns');
import { zonedTimeToUtc } from 'date-fns-tz';

class QrCodeController {
  async index(req, res) {
    let date = new Date();
    let dateParser = parseISO(date);
    const newDate = zonedTimeToUtc(dateParser, 'America/Sao_Paulo');

    QRCode.toString('I am a pony!', { type: 'svg' }, function (err, url) {
      return res.send(url, newDate);
    });
  }
}

module.exports = new QrCodeController();
