const db = require("../models");
const Origen = db.origen;

// Retrive all
exports.list = (req, res) => {
    Origen.findAll()
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Se ha producido un error al recuperar la Unidad/Servicio Origen Interconsulta."
        });
    });
};


// Create and Save a new Origen
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }
    
    // Save Origen in the database
    Origen.create({
        name: req.body.name,
        email: req.body.email,
        service: req.body.service,
    })
    .then(data => {
        res.send({message: "Unidad/Servicio Origen Interconsulta creada correctamente!"});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Se ha producido un error al crear la Unidad/Servicio Origen Interconsulta"
        });
    });
};


// Find a single Origen with an id
exports.retrive = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    Origen.findByPk(id)
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se ha encontrado la Unidad/Servicio Origen Interconsulta"
        });
    });
};


// Update a Origen by the id in the request
exports.update = (req, res) => {
    Origen.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(origen => {
        if(!origen) {
            return res.status(400).send({
                message: "No se ha encontrado la Unidad/Servicio Origen Interconsulta con id=" + req.params.id
            });
        }

        origen.update({
            name: req.body.name,
            email: req.body.email,
            service: req.body.service,
        })
        .then(data => res.send({message: "Unidad/Servicio Origen Interconsulta actualizada correctamente!"}))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error actualizando la Unidad/Servicio Origen Interconsulta"
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se ha encontrado la Unidad/Servicio Origen Interconsulta"
        });
    });
};


// Delete a Origen with the specified id in the request
exports.delete = (req, res) => {
    Origen.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(origen => {
        if(!origen) {
            return res.status(400).send({
                message: "No se ha encontrado la Unidad/Servicio Origen Interconsulta con id=" + req.params.id
            });
        }

        origen.destroy()
        .then(data => res.send({message: "Unidad/Servicio Origen Interconsulta eliminada correctamente!"}))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error eliminando la Unidad/Servicio Origen Interconsulta"
            });
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "No se ha encontrado la Unidad/Servicio Origen Interconsulta"
        });
    });
};
