const { Router } = require("express");
const router = Router();
const interconsultasController = require("../controllers/interconsulta.controller");
const icController = require("../controllers/processIC.controller");

router.post("/revisarInterconsultas", async (req, res) => {
  const result = await icController.processData(req.body);
  res.status(200).json(result);
});

// index
router.get("/", (req, res) => {
  interconsultasController.list(req, res);
});

// Not executed list
router.get("/notExecutedList", (req, res) => {
  interconsultasController.notExecutedList(req, res);
});

// create
router.post("/", (req, res) => {
  interconsultasController.create(req, res);
});

// show
router.get("/:id", (req, res) => {
  interconsultasController.retrive(req, res);
});

// update
router.put("/:id", (req, res) => {
  interconsultasController.update(req, res);
});

// delete
router.delete("/:id", (req, res) => {
  interconsultasController.delete(req, res);
});

// get descriptions
router.post("/descriptions", (req, res) => {
  interconsultasController.getDescriptions(req, res);
});

module.exports = router;
