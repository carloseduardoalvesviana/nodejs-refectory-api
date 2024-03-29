const MessageSchema = require('../models/Message');

class MessageController {
  async store(req, res) {
    const { message } = req.body;
    const msg = await MessageSchema.create({
      description: message,
    })
    return res.json(msg);
  }
}

module.exports = new MessageController();
