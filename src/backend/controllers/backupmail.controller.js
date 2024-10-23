const db = require("../models");
const BackupMail = db.backupmail;

// List
exports.list = (req, res) => {
    BackupMail.findAll()
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Se ha producido un error al recuperar los registros de respaldo del envío de interconsultas por correo."
        });
    });
}

// Create and Save a new backup mail
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }
    
    // Save backup mail in the database
    BackupMail.create({
        date: req.body.date,
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

// Find a single backup mail with an id
exports.retrive = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    BackupMail.findByPk(id)
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: "Error recuperando el registro con id=" + id
        });
    });
}

// Get last backup mail
exports.getLastBackup = (req, res) => {
    BackupMail.findAll({
        limit: 1,
        order: [['date', 'DESC']]
    })
    .then(data => {
        res.status(200).send({
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Se ha producido un error al recuperar el último registro de respaldo del envío de interconsultas por correo."
        });
    });
}

// Update a backup mail by the id in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "El contenido no puede estar vacío!"
        });
    }

    const id = req.params.id;

    BackupMail.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Registro actualizado correctamente."
            });
        } else {
            res.send({
                message: `No se puede actualizar el registro con id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error actualizando el registro con id=" + id
        });
    });
}

// Delete a backup mail with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    BackupMail.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Registro eliminado correctamente!"
            });
        } else {
            res.send({
                message: `No se puede eliminar el registro con id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "No se puede eliminar el registro con id=" + id
        });
    });
}