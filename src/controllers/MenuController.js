const MenuModel = require('../models/Menu');

class MenuController {
  async index(req, res) {
    const response = await MenuModel.find();
    return res.json(response);
  }

  async store(req, res) {
    const response = await MenuModel.create(req.body);
    return res.json(response);
  }

  async update(req, res) {
    const { id } = req.body;

    const description = req.body.description;
    const title = req.body.title;
    const date = req.body.date;
    const type = req.body.type;

    const data = {
      description, title, date, type
    }

    await MenuModel.findOneAndUpdate({ _id: id }, data);

    const response = await MenuModel.find();

    return res.json(response);
  }
}

module.exports = new MenuController();
