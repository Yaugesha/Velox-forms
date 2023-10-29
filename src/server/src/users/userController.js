const pool = require("../../db");
const queries = require("./queries");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}
const jwtKey = result.parsed.JWT_SECRETE_KEY;

class userController {
  async getUsers(req, res) {
    pool.query(queries.getUsers, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  }

  async getUserById(req, res) {
    const id = req.user.id;
    pool.query(queries.getUserById, [id], (error, results) => {
      console.log(results.rows);
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    pool.query(queries.getUserLoginData, [email], (error, results) => {
      if (error) throw error;
      if (results.rows.length !== 0) {
        if (results.rows[0].password === password) {
          const userId = results.rows[0].user_id;
          const token = jwt.sign({ id: userId }, jwtKey);
          res.status(201).send({
            id: userId,
            jwt: token,
            mesege: "Authorized succesfully",
          });
        } else res.status(400).send("Incorrect user data");
      } else res.status(400).send("Incorrect user data");
    });
  }

  async registUser(req, res) {
    //validation handle
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    const { user_id, email, password, role } = req.body;

    //is email unique
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (results.rows.length)
        return res.send("User with this email has already exists");
      pool.query(
        queries.addUser,
        [user_id, email, password, role],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("User registred succesfully");
          console.log("User created");
        }
      );
    });
  }
}

module.exports = new userController();
