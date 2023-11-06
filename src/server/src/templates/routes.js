const { Router } = require("express");
const controller = require("./templateController");

const router = Router();

router.post("/save", controller.saveTemplate);
router.post("/recent", controller.getRecentTemplates);
router.post("/all", controller.getAllTemplates);
router.post("/layout", controller.getTemplayteLayout);

module.exports = router;
