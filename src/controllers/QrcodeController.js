var QRCode = require('qrcode')
const { parseISO } = require('date-fns');
const { zonedTimeToUtc } = require('date-fns-tz');

class QrCodeController {
  async index(req, res) {

    let date = new Date();

    return res.json(date);
    /*
    let dateParser = parseISO(date);
    const newDate = zonedTimeToUtc(dateParser, 'America/Sao_Paulo');

    console.log(newDate);
  

    QRCode.toDataURL(`${date}`, { type: 'svg' }, function (err, url) {
      
    });]
    */
  }
}

module.exports = new QrCodeController();
