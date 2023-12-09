const { Router } = require("express");
const controller = require("./userController");
const { check } = require("express-validator");
const authMiddleware = require("./authMiddleware");
const {
  validatePassword,
  passwordValidationRules,
} = require("./passwordValidator.js");
const { validateEmail, emailValidationRules } = require("./emailValidator.js");

const router = Router();

router.get("/all", controller.getUsers);
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
router.get("/check-authtoken", authMiddleware, controller.checkToken);
router.post("/refresh-token", authMiddleware, controller.refreshToken);
router.post(
  "/change-email",
  authMiddleware,
  emailValidationRules(),
  validateEmail,
  controller.changeEmail
);
router.post(
  "/change-password",
  authMiddleware,
  passwordValidationRules(),
  validatePassword,
  controller.changePassword
);
router.post("/personal-data", authMiddleware, controller.getUserData);
router.post("/save-personal-data", authMiddleware, controller.saveUserData);

module.exports = router;
