const ClassReservation = require("../models/ClassReservation");
const ClassReservationAdmin = require("../models/ClassReservationAdmin");
const Student = require("../models/Student");

class ClassReservationController {
  async adminReservationStore(req, res) {
    try {
      const { admin_id, class_id, data } = req.body;
      await ClassReservationAdmin.create({
        admin_id,
        class_id,
        data,
      });
      return res.status(201).json({ message: "Agendamento marcado" });
    } catch (error) {
      return res.status(400).json({ message: "Tivemos um problema!!" });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    await ClassReservation.findOneAndUpdate(
      { _id: id },
      { approved: "sim" },
      { new: true }
    );
    return res.status(200).json({ message: "atualizado com sucesso!" });
  }

  async updateAdmin(req, res) {
    const { id } = req.params;
    await ClassReservationAdmin.findOneAndUpdate(
      { _id: id },
      { approved: "sim" },
      { new: true }
    );
    return res.status(200).json({ message: "atualizado com sucesso!" });
  }

  async addStudentsAdmin(req, res) {
    const { id } = req.params;
    const { id_student } = req.body;

    console.log(id_student);

    const _class = await ClassReservationAdmin.findOne({
      _id: id,
    });

    const response = _class.students.filter((item) => {
      return item == id_student;
    });

    if (response.length <= 0) {
      await ClassReservationAdmin.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            students: id_student,
          },
        }
      );

      return res.status(200).json({ message: "ok" });
    }

    return res.status(200).json({ message: "ja está incluido na reserva" });
  }

  async addStudents(req, res) {
    const { id } = req.params;
    const { id_student } = req.body;

    console.log(id_student);

    const _class = ClassReservation.findOne({
      _id: id,
    });

    const response = _class.students.map((item) => {
      if (item === id_student) {
        return true;
      }
    });

    console.log(response);

    const exists = _class.students.filter((item) => item === id_student);

    if (exists) {
      return res.status(200).json({ message: "aluno existe" });
    }

    await ClassReservation.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          students: id_student,
        },
      }
    );

    return res.status(200).json({ message: "ok" });
  }

  async disapprove(req, res) {
    const { id } = req.params;
    await ClassReservation.findOneAndUpdate(
      { _id: id },
      { approved: "não" },
      { new: true }
    );
    return res.status(200).json({ message: "reserva desaprovada" });
  }

  async disapproveAdmin(req, res) {
    const { id } = req.params;
    await ClassReservationAdmin.findOneAndUpdate(
      { _id: id },
      { approved: "não" },
      { new: true }
    );
    return res.status(200).json({ message: "reserva desaprovada" });
  }

  async getReservastionByTeacherId(req, res) {
    const { id } = req.params;
    console.log(id);
    const reservationsTeacher = await ClassReservation.find({
      teacher_id: id,
    })
      .populate({
        path: "class_id",
        populate: {
          path: "course",
        },
      })
      .populate("teacher_id")
      .populate("students")
      .exec();
    return res.status(200).json(reservationsTeacher);
  }

  async getReservastionByAdminId(req, res) {
    const { id } = req.params;
    console.log(id);
    const reservationsTeacher = await ClassReservationAdmin.find({
      admin_id: id,
    })
      .populate({
        path: "class_id",
        populate: {
          path: "course",
        },
      })
      .populate("admin_id")
      .populate("students")
      .exec();
    return res.status(200).json(reservationsTeacher);
  }

  async reservationDetail(req, res) {
    const { id } = req.params;

    const idStudents = await ClassReservation.findOne({ _id: id }).distinct(
      "studentsNot"
    );

    const studentsNot = await Student.find().where("_id").in(idStudents).exec();

    res.status(200).json(studentsNot);
  }

  async index(req, res) {
    const reservations = await ClassReservation.find({})
      .populate({
        path: "class_id",
        populate: {
          path: "course",
        },
      })
      .populate("teacher_id")
      .populate("students")
      .exec();
    return res.status(200).json(reservations);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      await ClassReservation.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: "deletado com sucesso" });
    } catch (error) {
      return res.status(201).json({ message: "Tivemos um problema!!" });
    }
  }

  async deleteAdmin(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      await ClassReservationAdmin.findOneAndDelete({ _id: id });
      return res.status(200).json({ message: "deletado com sucesso" });
    } catch (error) {
      return res.status(201).json({ message: "Tivemos um problema!!" });
    }
  }

  async reservation(req, res) {
    try {
      const { teacher_id, class_id, data } = req.body;
      await ClassReservation.create({
        teacher_id,
        class_id,
        data,
      });
      return res.status(201).json({ message: "Agendamento marcado" });
    } catch (error) {
      return res.status(201).json({ message: "Tivemos um problema!!" });
    }
  }
}

module.exports = new ClassReservationController();
