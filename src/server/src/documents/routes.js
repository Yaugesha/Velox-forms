const { Router } = require("express");
const controller = require("./documentController");

const router = Router();

router.post("/save", controller.saveDocument);
router.post("/all", controller.getAllDocuments);

module.exports = router;
