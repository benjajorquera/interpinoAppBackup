const db = require("../models");
const User = db.user;

// List
exports.list = (req, res) => {
    User.findAll()
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Se ha producido un error al recuperar los usuarios del usuario."
        });
    });
}

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }
    
    // Save user in the database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        staff: req.body.staff,
    })
    .then(data => {
        res.send({message: "Usuario creado correctamente!"});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Se ha producido un error al crear el usuario"
        });
    });
}

// Find a single user with an id
exports.retrive = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    User.findByPk(id)
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error recuperando el usuario con id=" + id
        });
    });
}

// Update an user by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Usuario actualizado correctamente."
            });
        } else {
            res.send({
                message: `No se puede actualizar el usuario con id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error actualizando el usuario con id=" + id
        });
    });
}

// Delete an user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Registro eliminado correctamente!"
            });
        } else {
            res.send({
                message: `No se puede eliminar el usuario con id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "No se puede eliminar el usuario con id=" + id
        });
    });
}