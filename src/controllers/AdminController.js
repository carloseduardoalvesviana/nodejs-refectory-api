const Admin = require("../models/Admin");

class AdminController {
  async index(req, res) {
    const admins = await Admin.find({});
    return res.status(200).json(admins);
  }
  async nutricionistas(req, res) {
    const admins = await Admin.find({ permission: "nutri" });
    return res.status(200).json(admins);
  }

  async findNutri(req, res) {
    const id = req.params.id;
    const nutricionista = await Admin.findOne({ _id: id });
    return res.status(200).json(nutricionista);
  }

  async auth(req, res) {
    const { email, password } = req.body;
    const response = await Admin.findOne({ email: email, password: password });
    if (response) {
      return res.status(200).json(response);
    }

    return res.status(404).send("Usuário e/ou senha incorreto(s)");
  }

  async findOne(req, res) {
    const id = req.params.id;
    const admin = await Admin.findOne({ _id: id });
    return res.status(200).json(admin);
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      const { name, cpf, phone, email, code, city, state, rg } = req.body;

      const admin = await Admin.findOneAndUpdate(
        { _id: id },
        {
          name,
          cpf,
          phone,
          email,
          code,
          city,
          state,
          rg,
        },
        { new: true }
      );

      return res.status(200).json(admin);
    } catch (error) {
      return res.status(400).json(admin);
    }
  }

  async store(req, res) {
    try {
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
        role,
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
        permission: role == "nutricionista" ? "nutri" : "admin",
      });

      return res.status(200).json(admin);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async delete(req, res) {
    const id = req.params.id;
    await Admin.findOneAndDelete({ _id: id });
    return res
      .status(200)
      .json({ message: "Administrador deletado com sucesso!" });
  }
}

module.exports = new AdminController();
