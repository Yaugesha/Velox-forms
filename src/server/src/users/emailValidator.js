const { body, validationResult } = require("express-validator");
const emailValidationRules = () => {
  return [body("email").notEmpty().isEmail()];
};

const validateEmail = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).send({
    message: "Email must be valid",
  });
};

module.exports = {
  emailValidationRules,
  validateEmail,
};
