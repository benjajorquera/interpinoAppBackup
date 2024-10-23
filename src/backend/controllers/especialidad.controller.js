const db = require("../models");
const Especialidad = db.especialidad;

// Retrive all
exports.list = (req, res) => {
    Especialidad.findAll()
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Se ha producido un error al recuperar las especialidades."
        });
    });
};


// Create and Save a new Especialidad
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }
    
    // Save Especialidad in the database
    Especialidad.create({
        name: req.body.name,
        email: req.body.email,
        service: req.body.service,
    })
    .then(data => {
        res.send({message: "Especialidad creada correctamente!"});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Se ha producido un error al crear la especialidad"
        });
    });
};


// Find a single Especialidad with an id
exports.retrive = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    Especialidad.findByPk(id)
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se ha encontrado la especialidad"
        });
    });
};


// Update a Especialidad by the id in the request
exports.update = (req, res) => {
    Especialidad.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(especialidad => {
        if(!especialidad) {
            return res.status(400).send({
                message: "No se ha encontrado la especialidad con id=" + req.params.id
            });
        }

        especialidad.update({
            name: req.body.name,
            email: req.body.email,
            service: req.body.service,
        })
        .then(data => res.send({message: "Especialidad actualizada correctamente!"}))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error actualizando la especialidad"
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se ha encontrado la especialidad"
        });
    });
};


// Delete a Especialidad with the specified id in the request
exports.delete = (req, res) => {
    Especialidad.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(especialidad => {
        if(!especialidad) {
            return res.status(400).send({
                message: "No se ha encontrado la especialidad con id=" + req.params.id
            });
        }

        especialidad.destroy()
        .then(data => res.send({message: "Especialidad eliminada correctamente!"}))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error eliminando la especialidad"
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se ha encontrado la especialidad"
        });
    });
};
