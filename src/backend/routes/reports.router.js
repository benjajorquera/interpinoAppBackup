const reportsController = require('../controllers/reports.controller');
const { Router } = require('express');
const router = Router();



router.post("/reportsBySpecialtyDate", (req, res) => {
    reportsController.reportsBySpecialtyDate(req, res);
});

module.exports = router;