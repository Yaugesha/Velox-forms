const { Router } = require("express");
const controller = require("./userController");
const { check } = require("express-validator");
const authMiddleware = require("./authMiddleware");
const { validate, passwordValidationRules } = require("./passwordValidator.js");

const router = Router();

router.get("/", controller.getUsers);
router.post("/user", authMiddleware, controller.getUserById);
router.post(
  "/regist",
  [
    check("email", "Email must be valid").notEmpty().isEmail(),
    check(
      "password",
      "Password must contains more then 6 symbols (include: 1 capital, 1 number and 1 symbol)"
    ).isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ],
  controller.registUser
);
router.post("/login", controller.loginUser);
router.post("/check-auth", authMiddleware, controller.refreshToken);
router.post("/change-email", authMiddleware, controller.changeEmail);
router.post(
  "/change-password",
  authMiddleware,
  passwordValidationRules(),
  validate,
  controller.changePassword
);
router.post("/personal-data", authMiddleware, controller.getUserData);
router.post("/save-personal-data", authMiddleware, controller.saveUserData);

module.exports = router;
