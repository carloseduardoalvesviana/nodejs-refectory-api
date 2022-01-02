const LackSchema = require("../models/Lack");
const ReserveModel = require("../models/Reserve");
const Student = require("../models/Student");
const { parse, startOfDay, endOfDay } = require("date-fns");

var { date } = require("../helpers/dateFormat");

class LackController {
  async index(req, res) {
    const response = await LackSchema.find()
      .populate("id_student")
      .populate("id_student")
      .exec();
    return res.status(200).json(response);
  }

  async teste(req, res) {
    const { inicio, final, turma } = req.body;
    var results = await LackSchema.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: 'id_student',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
      $unwind: "$student"
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'student.id_class',
          foreignField: '_id',
          as: 'class',
        },
      },
      {
      $unwind: "$class"
      },
       {
        $match: {
          "class.description": { "$regex": turma, "$options": "i" }  
        }
      },
      {
        $project:{
          "_id":1,
          "name": "$student.name",
          "turma": "$class.description"
        }
      }
    ]);
      return res.status(200).json(results);
  }

  async filterLack(req, res) {
    try {
      const { inicio, final, turma } = req.body;
      if (!inicio && final) {
              return res.status(400).json({message: 'Preencha as duas datas'});
      }
      if (inicio && !final) {
              return res.status(400).json({message: 'Preencha as duas datas'});
      }
        let dateInicio = parse(inicio, "dd/MM/yyyy", new Date());
        let dateFinal = parse(final, "dd/MM/yyyy", new Date());
        const response = await LackSchema.find({})
        .populate("id_reserve")
        .populate({
          path: 'id_student',
          populate : {
            path: 'id_class',
            model: 'Class',
            match: {
              description: {$regex: '.*' + turma + '.*' }
            },
          },
        })
        .exec();
      let filter = [];
      
     await response.map((item, index) => {
        if (item.id_student.id_class) {
          filter.push(item);
        }
      });
        
      return res.status(200).json(filter);
    } catch (error) {
      return res.status(400).json(error);

    }
    
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
        console.log(item);
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
