const { v4 } = require('uuid');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'temp'))
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = v4();
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

module.exports = { storage };