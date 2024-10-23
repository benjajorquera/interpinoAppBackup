const controller = require('../controllers/user.controller');
const { Router } = require('express');
const router = Router();

// index
router.get('/',  (req, res) => {
    controller.list(req, res);
});

// create
router.post('/',  (req, res) => {
    controller.create(req, res);
});

// show
router.get('/:id',  (req, res) => {
    controller.retrive(req, res);
});

// update
router.put('/:id',  (req, res) => {
    controller.update(req, res);
});

// delete
router.delete('/:id',  (req, res) => {
    controller.delete(req, res);
});

module.exports = router;