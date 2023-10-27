const pool = require("../../db");
const queries = require("./queries");
const { validationResult } = require("express-validator");

class userController {
  async getUsers(req, res) {
    pool.query(queries.getUsers, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  }

  async getUserById(req, res) {
    const id = parseInt(req.params.id);
    pool.query(queries.getUserById, [
      id,
      (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
      },
    ]);
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (!results.rows.length) res.send("User with this email does not exist");
      pool.query(queries.getUserPassword, [email], (error, results) => {
        if (error) throw error;
        if (results.rows[0].password === password)
          res.status(201).send("Authorized succesfully");
        else res.status(400).send("Incorrect user password");
      });
    });
  }

  async registUser(req, res) {
    //validation handle
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    const { user_id, email, password, role } = req.body;

    //is email unique
    pool.query(queries.checkEmailExists, [email], (error, results) => {
      if (results.rows.length) {
        res.send("User with this email has already exists");
      }
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
