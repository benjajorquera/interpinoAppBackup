const db = require("../models");
const Interconsulta = db.interconsulta;
const { Op } = require("sequelize");
const Sequelize = require("sequelize");

// Retrive all Interconsultas
exports.list = (req, res) => {
  Interconsulta.findAll()
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Se ha producido un error al recuperar las Interconsultas.",
      });
    });
};

// Retrieve Interconsultas No Ejecutadas más de 2 días
exports.notExecutedList = (req, res) => {
  var todayDate = new Date();
  todayDate.setDate(todayDate.getDate() - 2);
  Interconsulta.findAll({
    where: {
      status: { [Op.not]: "Ejecutado" },
      dateRequest: {
        [Op.lt]: todayDate.toLocaleDateString("en-CA"),
      },
    },
  })
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Se ha producido un error al recuperar las Interconsultas No Ejecutadas.",
      });
    });
};

// Create and Save a new Interconsulta
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Save Interconsulta in the database
  Interconsulta.create({
    name: req.body.name,
    run: req.body.run,
    age: req.body.age,
    gender: req.body.gender,
    diagnosis: req.body.diagnosis,
    origin: req.body.origin,
    room: req.body.room,
    bed: req.body.bed,
    description: req.body.description,
    request: req.body.request,
    evaluate: req.body.evaluate,
    status: req.body.status,
    dateRequest: req.body.dateRequest,
    timeRequest: req.body.timeRequest,
    dateExecute: req.body.dateExecute,
    timeExecute: req.body.timeExecute,
    waitingTime: req.body.waitingTime,
    reasonChangeStatus: req.body.reasonChangeStatus,
    Observations: req.body.Observations,
  })
    .then((data) => {
      res.send({ message: "Interconsulta creada correctamente!" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Se ha producido un error al crear la Interconsulta",
      });
    });
};

// Find a single Interconsulta with an id
exports.retrive = (req, res) => {
  // Validate request
  if (!req.params.id) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  const id = req.params.id;

  Interconsulta.findByPk(id)
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "No se ha encontrado la Interconsulta",
      });
    });
};

// Update a Interconsulta by the id in the request
exports.update = (req, res) => {
  Interconsulta.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((interconsulta) => {
      if (!interconsulta) {
        return res.status(400).send({
          message:
            "No se ha encontrado la Interconsulta con id=" + req.params.id,
        });
      }

      interconsulta
        .update({
          name: req.body.name,
          run: req.body.run,
          age: req.body.age,
          gender: req.body.gender,
          diagnosis: req.body.diagnosis,
          origin: req.body.origin,
          room: req.body.room,
          bed: req.body.bed,
          description: req.body.description,
          request: req.body.request,
          evaluate: req.body.evaluate,
          status: req.body.status,
          dateRequest: req.body.dateRequest,
          timeRequest: req.body.timeRequest,
          dateExecute: req.body.dateExecute,
          timeExecute: req.body.timeExecute,
          waitingTime: req.body.waitingTime,
          reasonChangeStatus: req.body.reasonChangeStatus,
          Observations: req.body.Observations,
        })
        .then((data) =>
          res.send({ message: "Interconsulta actualizada correctamente!" })
        )
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error actualizando la Interconsulta",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "No se ha encontrado la Interconsulta",
      });
    });
};

// Delete a Interconsulta with the specified id in the request
exports.delete = (req, res) => {
  Interconsulta.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((interconsulta) => {
      if (!interconsulta) {
        return res.status(400).send({
          message:
            "No se ha encontrado la Interconsulta con id=" + req.params.id,
        });
      }

      interconsulta
        .destroy()
        .then((data) =>
          res.send({ message: "Interconsulta eliminada correctamente!" })
        )
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error eliminando la Interconsulta",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "No se ha encontrado la Interconsulta",
      });
    });
};

// get all descriptions values distincts
exports.getDescriptions = (req, res) => {
  Interconsulta.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("description")), "description"]],
  })
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Se ha producido un error al recuperar las descripciones de las Interconsultas.",
      });
    });
}