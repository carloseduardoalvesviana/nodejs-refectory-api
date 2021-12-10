const LackSchema = require("../models/Lack");
const ReserveModel = require("../models/Reserve");
const Student = require("../models/Student");

const { format } = require("date-fns");

var { date } = require("../helpers/dateFormat");

class LackController {
  async index(req, res) {
    const response = await LackSchema.find()
      .populate("id_student")
      .populate("id_student")
      .exec();
    return res.status(200).json(response);
  }

  async jobLack(req, res) {
    try {
      const reserveLacks = await ReserveModel.find({
        confirm: "não",
      })
        .populate("id_menu")
        .populate("id_student")
        .exec();

      const students = await Student.find({});

      // Retirar a permissão dos alunos
      students.map(async (item) => {
        await Student.findOneAndUpdate(
          { _id: item._id },
          {
            permission: "não",
          }
        );
      });

      reserveLacks.map(async (item) => {
        //verifica se existe o id da reserva a ser salva no model lack e não salva
        const reserve = await LackSchema.findOne({ id_reserve: item._id });
        if (!reserve) {
          await LackSchema.create({
            id_student: item.id_student._id,
            id_reserve: item._id,
          });

          const infoStudent = await Student.findOne({
            _id: item.id_student._id,
          });
          // busca o estudante e adiociona mais uma falta
          const student = await Student.findOneAndUpdate(
            { _id: item.id_student._id },
            {
              lack: infoStudent.lack + 1,
              permission: "não",
            }
          );

          //verifica se a quantidade de faltas é igual a 3 para bloquear
          // o acesso a solicitação do cardápio
          if (student.lack + 1 >= 3) {
            await Student.findOneAndUpdate(
              { _id: item.id_student._id },
              {
                bloqued: true,
              }
            );
          }
        }
      });

      return res.status(200).json("Tarefa executada com sucesso.");
    } catch (error) {
      return res.status(200).json(error);
    }
  }
}

module.exports = new LackController();
