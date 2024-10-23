const controller = require('../controllers/fruta.controller').default;
const { Router } = require('express');
const router = Router();

// index
router.get('/', async (req, res) => {
    console.log("GET /frutas");
    const result = await controller.index().catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    console.log("result: ", result);
    res.status(200).json(result);
});

// create
router.post('/', async (req, res) => {
    console.log(req.body);
    const result = await controller.create(req.body).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    console.log("result: ", result);
    res.status(200).json(result);
});

// show
router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const result = await controller.show(req.params.id).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    console.log("result: ", result);
    res.status(200).json(result);
});

// update
router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const result = await controller.update(req.params.id, req.body).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    console.log("result: ", result);
    res.status(200).json(result);
});

// delete
router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    const result = await controller.destroy(req.params.id).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    console.log("result: ", result);
    res.status(200).json(result);
});

module.exports = router;