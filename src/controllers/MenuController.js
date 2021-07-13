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
}

module.exports = new MenuController();
