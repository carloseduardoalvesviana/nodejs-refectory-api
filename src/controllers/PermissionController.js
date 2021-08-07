const Student = require('../models/Student');

class PermissionController {
  async update(req, res) {
    const { id } = req.params;
    await Student.updateOne({ _id: id }, { permission: 'sim' });
    return res.json({ message: 'ok' });
  }

  async updateNo(req, res) {
    const { id } = req.params;
    await Student.updateOne({ _id: id }, { permission: 'não' });
    return res.json({ message: 'ok' });
  }
}

module.exports = new PermissionController();
