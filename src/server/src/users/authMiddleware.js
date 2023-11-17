const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const jwtKey = () => {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  const jwtKey = result.parsed.JWT_SECRETE_KEY;
  return jwtKey;
};

module.exports = (req, res, next) => {
  console.log(req.body);
  const authHeader = req.body.jwt;

  if (!authHeader) {
    return res.status(400).send("You have no token");
  }
  const data = jwt.verify(authHeader, jwtKey());
  console.log(data);
  req.user = data;
  next();
};
