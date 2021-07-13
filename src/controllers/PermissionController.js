const Permission = require('../models/Permission');

class PermissionController {
  async store(req, res) {
    const response = await Permission.create(req.body);
    return res.json(response);
  }
}

module.exports = new PermissionController();
