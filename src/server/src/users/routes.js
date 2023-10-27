const { Router } = require("express");
const controller = require("./userController");
const { check } = require("express-validator");

const router = Router();

router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.post(
  "/regist",
  [
    check("email", "email must be valid").notEmpty().isEmail(),
    check(
      "password",
      "password must contains more then 6 symbols (include at least 1 capital 1 number 1 symbol)"
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

module.exports = router;
