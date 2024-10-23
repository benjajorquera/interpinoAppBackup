const db = require("../models");
const Email = db.email;

// List
exports.list = (req, res) => {
    Email.findAll()
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Se ha producido un error al recuperar los registros de correo."
        });
    });
}

// Create and Save a new email
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }
    
    // Save email in the database
    Email.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        host: req.body.host,
        port: req.body.port,
    })
    .then(data => {
        res.send({message: "Registro creado correctamente!"});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Se ha producido un error al crear el registro"
        });
    });
}

// Find a single email with an id
exports.retrive = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    Email.findByPk(id)
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al recuperar el registro con id=" + id
        });
    });
}

// Update a email by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    Email.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Registro actualizado correctamente."
            });
        } else {
            res.send({
                message: `No se puede actualizar el registro con id=${id}. Tal vez el registro no fue encontrado o el cuerpo de la solicitud está vacío!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error al actualizar el registro con id=" + id
        });
    });
}

// Delete a email with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Email.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Registro eliminado correctamente!"
            });
        } else {
            res.send({
                message: `No se puede eliminar el registro con id=${id}. Tal vez el registro no fue encontrado!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "No se pudo eliminar el registro con id=" + id
        });
    });
}