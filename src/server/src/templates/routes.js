const { Router } = require("express");
const controller = require("./templateController");

const router = Router();

router.post("/save", controller.saveTemplate);

module.exports = router;
