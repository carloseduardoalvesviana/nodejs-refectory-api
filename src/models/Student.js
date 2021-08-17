const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  DATA_EXPEDICAO: String,
  ORGAO_EXP: String,
  NUM_DE_IDENTIDADE: String,
  CPF: String,
  EMAIL: String,
  TELEFONES: String,
  NATURALIDADE: String,
  TURNO: String,
  PERIODO: String,
  CURSO: String,
  NASCIMENTO: String,
  TURMA: String,
  SITUACAO_PERIODO: String,
  NOME: String,
  MATRICULA: String,
  CIDADE: String,
  BAIRRO: String,
  COMPLEMENTO: String,
  NUMERO: String,
  ENDERECO: String,
  NOME_DA_MAE: String,
  NOME_DO_PAI: String,
  ESTADO_IDENT: String,
  permission: {
    type: String,
    default: 'não'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
