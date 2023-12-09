const { body, validationResult } = require("express-validator");
const passwordValidationRules = () => {
  return [
    body("newPassword").isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ];
};

const validatePassword = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).send({
    message:
      "Password must contains more then 6 symbols (include: 1 capital, 1 number and 1 symbol)",
  });
};

module.exports = {
  passwordValidationRules,
  validatePassword,
};
