const { Router } = require("express");
const controller = require("./templateController");
const authMiddleware = require("../users/authMiddleware");

const router = Router();

router.post("/save", controller.saveTemplate);
router.post("/recent", controller.getRecentTemplates);
router.post("/all", controller.getAllTemplates);
router.post("/layout", authMiddleware, controller.getTemplate);

module.exports = router;
