const { Router } = require("express");
const controller = require("./documentController");
const authMiddleware = require("../users/authMiddleware");

const router = Router();

router.post("/save", controller.saveDocument);
router.get("/all", controller.getAllDocuments);
router.post("/file", controller.getDocumentFile);
router.post("/rename", authMiddleware, controller.renameDocument);
router.delete("/delete", authMiddleware, controller.deleteDocument);

module.exports = router;
