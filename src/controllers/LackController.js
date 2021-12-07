const LackSchema = require("../models/Lack");
const ReserveModel = require("../models/Reserve");
const { format } = require("date-fns");
var { date } = require("../helpers/dateFormat");

class LackController {
  async index(req, res) {
    const response = await LackSchema.find();
    return res.status(200).json(response);
  }

  async jobLack(req, res) {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const reserves = await ReserveModel.find({})
        .populate("id_menu")
        .populate("id_student")
        .exec();

      const reserveLacks = reserves
        .filter((item) => {
          return item.confirm == "não";
        })
        .filter((item) => {
          return date(item.id_menu.date) == today;
        });

      reserveLacks.map(async (item) => {
        //verifica se existe o id da reserva a ser salva no model lack e não salva
        const reserve = await LackSchema.findOne({ id_reserve: item._id });
        if (!reserve) {
          await LackSchema.create({
            id_student: item.id_student._id,
            id_reserve: item._id,
          });
        }
      });

      return res.status(200).json("Tarefa executada com sucesso.");
    } catch (error) {
      return res.status(200).json(error);
    }
  }
}

module.exports = new LackController();
