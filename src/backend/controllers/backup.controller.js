const db = require("../models");
const Backup = db.backup;

// Retrive all
exports.list = (req, res) => {
  Backup.findAll()
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Se ha producido un error al recuperar la fecha de respaldo.",
      });
    });
};

// Create and Save a new Backup
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  // Save Backup in the database
  Backup.create({
    date: new Date(),
  })
    .then((data) => {
      res.send({ message: "Backup creada correctamente!" });
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Se ha producido un error al crear el respaldo",
      });
    });
};

// Find a single Backup with an id
exports.retrive = (req, res) => {
  // Validate request
  if (!req.params.id) {
    return res.status(400).send({
      message: "El contenido no puede estar vacío!",
    });
  }

  const id = req.params.id;

  Backup.findByPk(id)
    .then((data) => {
      res.status(200).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "No se ha encontrado la fecha de respaldo",
      });
    });
};

// Update a Backup by the id in the request
exports.update = (req, res) => {
  Backup.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((backup) => {
      if (!backup) {
        return res.status(400).send({
          message:
            "No se ha encontrado la fecha de respaldo con id=" + req.params.id,
        });
      }

      backup
        .update({
          date: req.body.date,
        })
        .then((data) =>
          res.send({ message: "Fecha de respaldo actualizada correctamente!" })
        )
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Error actualizando la fecha de respaldo",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "No se ha encontrado el respaldo",
      });
    });
};
