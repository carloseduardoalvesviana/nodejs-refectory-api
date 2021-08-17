const path = require('path');
const csv = require('csvtojson');
const StudentSchema = require('../models/Student');

class CsvController {
  async read(req, res) {
    const file = path.resolve(__dirname, '..', '..', 'temp', req.file.filename);

    csv().fromFile(file).then(file => {
      StudentSchema.insertMany(file, (err, res) => {
        if (err) {
          throw err;
        }
      })
    });
    return res.json({ message: 'sucesso' });
  }
}

module.exports = new CsvController();
