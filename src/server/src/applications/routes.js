const { Router } = require("express");
const controller = require("./applicationController");
const authMiddleware = require("../users/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage });

const router = Router();
router.post("/save", upload.single("file"), controller.saveReferenceFile);
router.post("/create", authMiddleware, controller.createApplication);
router.get("/get", authMiddleware, controller.getUserApplications);
router.get("/getAll", authMiddleware, controller.getApplications);
router.get("/getApplication", authMiddleware, controller.getApplication);
router.delete("/delete", authMiddleware, controller.deleteApplication);
router.put("/edit", authMiddleware, controller.editApplication);
router.put("/changeStatus", authMiddleware, controller.changeApplicationStatus);

module.exports = router;
