const LackSchema = require("../models/Lack");
const ReserveModel = require("../models/Reserve");

class LackController {
  async index(req, res) {
    const response = await LackSchema.find();
    return res.status(200).json(response);
  }

  async jobLack() {
    const reserves = await ReserveModel.find({})
      .populate("id_menu")
      .populate("id_student");
  }
}

module.exports = new LackController();
