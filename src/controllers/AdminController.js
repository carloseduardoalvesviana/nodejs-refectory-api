const Admin = require('../models/Admin');

class AdminController {
  async index(req, res) {
    const admins = await Admin.find({});
    return res.status(200).json(admins);
  }
    
  async auth(req, res) {
    const { email, password } = req.body;
    const response = await Admin.findOne({ email: email }).findOne({password: password});
    if (response) {
      return res.status(200).json(response);
    }
    
    return res.status(404).send('Usuário e/ou senha incorreto(s)');
  }

  async findOne(req, res) {
    const id = req.params.id;
    const admin = await Admin.findOne({ _id: id });
    return res.status(200).json(admin);
  }

  async update(req, res) {
    const id = req.params.id;

    const {
      name,
      cpf,
      phone,
      email,
      code,
      city,
      state,
      rg
    } = req.body;

    const admin = await Admin.findOneAndUpdate({ _id: id },
      {
        name,
        cpf,
        phone,
        email,
        code,
        city,
        state,
        rg
      }, { new: true });

    return res.status(200).json(admin);
  }

  async store(req, res) {
    const {
      name,
      email,
      password,
      cpf,
      rg,
      phone,
      state,
      city,
      address,
      number,
      birth_date,
      cep,
    } = req.body;

    const admin = await Admin.create({
      name,
      email,
      password,
      cpf,
      rg,
      phone,
      state,
      city,
      address,
      number,
      birth_date,
      cep,
    })

    return res.status(200).json(admin)
  }

  async delete(req, res) {
    const id = req.params.id;
    await Admin.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: 'Administrador deletado com sucesso!' });
  }
}

module.exports = new AdminController();
