const { Router } = require("express");
const router = Router();
const controller = require("../controllers/enqueue.controller");

router.post("/enqueueInterconsultas", async (req, res) => {
  const result = await controller.groupByICSO(req.body)
  console.log(result)
  res.status(200).json(result);
});

module.exports = router;