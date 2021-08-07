const Student = require('../models/Student');

class PermissionController {
  async update(req, res) {
    const { id } = req.params;
    await Student.updateOne({ _id: id }, { permission: 'sim' });
    return req.json({ message: 'ok' });
  }
}

module.exports = new PermissionController();
