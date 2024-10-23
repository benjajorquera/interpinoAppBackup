const controller = require('../controllers/mailer.controller').default;
const { Router } = require('express');
const router = Router();

// send mail
router.post('/', async (req, res) => {
    console.log(req.body);
    const result = await controller.sendMail(req.body).catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
    console.log("result: ", result);
    res.status(200).json(result);
});

module.exports = router;
