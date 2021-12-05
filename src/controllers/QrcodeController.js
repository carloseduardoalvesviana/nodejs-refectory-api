const Reserve = require("../models/Reserve");
const Student = require("../models/Student");
const MenuModel = require("../models/Menu");
var { dateFormate } = require("../helpers/dateFormat");
class QrCodeController {
  async confirm(req, res) {
    let id_reserve = req.params.id;
    let qrcode = req.body.qrcode;
    let id_menu = req.body.id_menu;

    if (!qrcode) {
      return res.status(400).json({ message: "no token provider" });
    }

    const menu = await MenuModel.findOne({ _id: id_menu });

    const validandoHorarioReserva = await dateFormate(
      menu.date,
      menu.hourConfirmReserve
    );

    if (!validandoHorarioReserva) {
      return res.status(400).json({ message: "Fora do horário." });
    }

    const reserve = await Reserve.findOneAndUpdate(
      { _id: id_reserve },
      { confirm: "sim" },
      { new: true }
    );

    const id_student = reserve.id_student;

    await Student.findOneAndUpdate(
      { _id: id_student },
      { permission: "não" },
      { new: true }
    );

    return res.json({ message: "Reserva confirmada!" });
  }

  async index(req, res) {
    var randomPassword = Math.random().toString(36).slice(-8);
    return res.status(200).json(randomPassword);
  }
}

module.exports = new QrCodeController();
