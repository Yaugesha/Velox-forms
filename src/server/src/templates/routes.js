const { Router } = require("express");
const controller = require("./templateController");
const authMiddleware = require("../users/authMiddleware");

const router = Router();

router.post("/save", controller.saveTemplate);
router.get("/recent", authMiddleware, controller.getRecentTemplates);
router.get("/all", authMiddleware, controller.getAllTemplates);
router.post("/layout", authMiddleware, controller.getTemplate);
router.post("/rename", authMiddleware, controller.renameTemplate);
router.delete("/delete", authMiddleware, controller.deleteTemplate);
router.get("/category/get", authMiddleware, controller.getTemplateCategories);
router.post(
  "/category/rename",
  authMiddleware,
  controller.renameTemplateCategory
);
router.delete(
  "/category/delete",
  authMiddleware,
  controller.deleteTemplateCategory
);

module.exports = router;
