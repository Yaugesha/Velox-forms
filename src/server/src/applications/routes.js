const { Router } = require("express");
const controller = require("./applicationController");
const authMiddleware = require("../users/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const types = ["file/docx", "file/txt", "file/pdf"];

const fileFilter = (req, file, callback) => {
  console.log(file.mimetype, file);
  if (types.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage /*, fileFilter */ });

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
