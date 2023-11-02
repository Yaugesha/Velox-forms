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
          const role = results.rows[0].role;
          const token = jwt.sign({ id: userId, role: role }, jwtKey);
          res.status(200).send({
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

    const { email, password } = req.body;

    //is email unique
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (results.rows.length)
        return res.send("User with this email has already exists");
      pool.query(
        queries.addUser,
        [email, password, "user"],
        (error, results) => {
          if (error) throw error;
          pool.query(queries.getUserByEmail, [email], (error, results) => {
            if (error) throw error;
            const userId = results.rows[0];
            console.log(userId);
            const token = jwt.sign({ id: userId, role: "user" }, jwtKey);
            res.status(200).send({
              jwt: token,
              messege: "User registred succesfully",
            });
            console.log("User created");
          });
        }
      );
    });
  }

  async refreshToken(req, res) {
    const userId = req.user.id;
    const role = req.user.role;
    console.log(req.user);
    const token = jwt.sign({ id: userId, role: role }, jwtKey);
    res.status(200).send({
      jwt: token,
      mesege: "Token refreshed",
    });
  }

  async chengeEmail(req, res) {
    const { id, role } = req.user;
    const newEmail = req.body.email;
    const recievedPassword = req.body.password;
    pool.query(queries.checkEmailExists, [newEmail], (error, results) => {
      if (results.rows.length)
        return res.status(400).send("User with this email has already exists");
      pool.query(queries.getUserById, [id], (error, results) => {
        if (error) throw error;
        const currentEmail = results.rows[0].email;
        const password = results.rows[0].password;
        if (recievedPassword !== password)
          return res.status(400).send("Incorrect password");
        else {
          pool.query(
            queries.changeUserEmail,
            [currentEmail, newEmail],
            (error, results) => {
              if (error) throw error;
              const token = jwt.sign({ id: id, role: role }, jwtKey);
              res.status(200).send({
                jwt: token,
                messege: "User email changed succesfully",
              });
              console.log("User email changed");
            }
          );
        }
      });
    });
  }
}

module.exports = new userController();
