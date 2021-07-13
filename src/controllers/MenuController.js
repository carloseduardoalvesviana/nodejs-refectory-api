const MenuModel = require('../models/Menu');

class MenuController {
  async store(req, res) {
    const response = await MenuModel.create(req.body);
    return res.json(response);
  }
}

module.exports = new MenuController();
