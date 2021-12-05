const MenuModel = require("../models/Menu");
var { getYear } = require("date-fns");

class MenuController {
  async index(req, res) {
    const response = await MenuModel.find();
    return res.status(200).json(response);
  }

  async findOne(req, res) {
    const { id } = req.params;
    const response = await MenuModel.findOne({ _id: id });
    return res.json(response);
  }

  async findMenuOfDay(req, res) {
    const dataAtual = new Date();
    const diaAtual = dataAtual.getDate();
    let mesAtual = 0;
    mesAtual += dataAtual.getMonth() + 1;
    const anoAtual = getYear(dataAtual);

    const Data =
      (diaAtual > 9 ? diaAtual : "0" + diaAtual) +
      "/" +
      mesAtual +
      "/" +
      anoAtual;

    console.log(Data);

    const response = await MenuModel.findOne({ date: Data });

    return res.status(200).json(response);
  }

  async store(req, res) {
    const { date } = req.body;
    const dateExists = await MenuModel.findOne({ date: date });

    if (dateExists) {
      return res.status(400).json({ message: "menu ja existe" });
    }

    const response = await MenuModel.create(req.body);
    return res.json(response);
  }

  async update(req, res) {
    try {
      const id = req.body.id;
      const description = req.body.description;
      const title = req.body.title;
      const date = req.body.date;
      const type = req.body.type;
      const hourReserve = req.body.hourReserve;
      const hourConfirmReserve = req.body.hourConfirmReserve;

      let data = {
        description,
        title,
        date,
        type,
        hourReserve,
        hourConfirmReserve,
      };

      console.log(data);

      const response = await MenuModel.findOneAndUpdate(
        { _id: id },
        {
          description: description,
          title: title,
          date: date,
          type: type,
          hourReserve: hourReserve,
          hourConfirmReserve: hourConfirmReserve,
        },
        { new: true }
      );

      return res.json(response);
    } catch (error) {}
  }

  async delete(req, res) {
    try {
      const { id } = req.body;
      console.log(id);
      const response = await MenuModel.findByIdAndDelete({ _id: id });
      return res.json(response);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

module.exports = new MenuController();
