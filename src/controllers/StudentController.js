const Student = require('../models/Student');

class StudentController {
  async index(req, res) {
    const response = await Student.find();
    return res.json(response);
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await Student.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: 'Estudante Deletado com sucesso!' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async store(req, res) {
    const {
      data_expedicao,
      orgao_exp,
      num_de_identidade,
      cpf,
      email,
      naturalidade,
      turno,
      periodo,
      curso,
      nascimento,
      telefones,
      turma,
      situacao_periodo,
      nome,
      matricula,
      cidade,
      bairro,
      complemento,
      numero,
      endereco,
      nome_da_mae,
      nome_do_pai,
      estado_ident,
    } = req.body;

    let student = await Student.create({
      DATA_EXPEDICAO: data_expedicao,
      ORGAO_EXP: orgao_exp,
      NUM_DE_IDENTIDADE: num_de_identidade,
      CPF: cpf,
      EMAIL: email,
      TELEFONES: telefones,
      NATURALIDADE: naturalidade,
      TURNO: turno,
      PERIODO: periodo,
      CURSO: curso,
      NASCIMENTO: nascimento,
      TURMA: turma,
      SITUACAO_PERIODO: situacao_periodo,
      NOME: nome,
      MATRICULA: matricula,
      CIDADE: cidade,
      BAIRRO: bairro,
      COMPLEMENTO: complemento,
      NUMERO: numero,
      ENDERECO: endereco,
      NOME_DA_MAE: nome_da_mae,
      NOME_DO_PAI: nome_do_pai,
      ESTADO_IDENT: estado_ident,
    })

    return res.status(200).json(student);
  }
}

module.exports = new StudentController();
