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

module.exports = router;
