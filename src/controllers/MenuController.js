const MenuModel = require('../models/Menu');

class MenuController {
  async store(req, res) {
    await MenuModel.create(req.body);
  }
}

module.exports = new MenuController();
