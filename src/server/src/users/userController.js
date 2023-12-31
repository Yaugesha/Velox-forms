const { pool } = require("../../db");
const queries = require("./queries");
const { validationResult } = require("express-validator");
const {
  User,
  UserPersonalData,
  UserWorkData,
  Document,
  Template,
  Application,
} = require("../../models/models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { where } = require("sequelize");
const result = dotenv.config();

if (result.error) {
  throw result.error;
}
const jwtKey = result.parsed.JWT_SECRETE_KEY;

class userController {
  async getUsers(req, res) {
    const users = await User.findAll({
      include: [Document, Template, Application],
    });
    console.log(users);
    const result = users.map((user) => {
      console.log(user.dataValues);
      return {
        ...user.dataValues,
        documents: user.dataValues.documents.length,
        templates: user.dataValues.templates.length,
        applications: user.dataValues.applications.length,
      };
    });
    res.status(200).send({ users: result });
    // pool.query(queries.getUsers, (error, results) => {
    //   if (error) throw error;
    //   res.status(200).json(results.rows);
    // });
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
    User.findOne({ where: { email } }).then((user) => {
      if (user && user.password === password) {
        const token = jwt.sign({ id: user.id, role: user.role }, jwtKey);
        res.status(200).send({
          jwt: token,
          message: "You've been authorized successfully",
        });
      } else res.status(400).send({ message: "Incorrect user data" });
    });
  }

  async registUser(req, res) {
    //validation handle
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);

    const { email, password } = req.body;
    User.findOrCreate({
      where: { email: email },
      defaults: { password: password, role: "user" },
    }).then(([user, created]) => {
      if (created) {
        const id = user.id;
        const token = jwt.sign({ id: id, role: "user" }, jwtKey);
        res.status(200).send({
          jwt: token,
          message: "User registred successfully",
        });
        console.log("User created");
      } else {
        console.log("User exists");
        return res
          .status(400)
          .send({ message: "User with this email has already exists" });
      }
    });
  }

  async checkToken(req, res) {}

  async refreshToken(req, res) {
    const userId = req.user.id;
    const role = req.user.role;
    console.log(req.user);
    const token = jwt.sign({ id: userId, role: role }, jwtKey);
    res.status(200).send({
      jwt: token,
      message: "Token refreshed",
    });
  }

  async changeEmail(req, res) {
    const { id, role } = req.user;
    const newEmail = req.body.email;
    const recievedPassword = req.body.password;
    const user = await User.findOne({ where: { id: id } });
    if (recievedPassword === user.password) {
      User.update({ email: newEmail }, { where: { email: user.email } })
        .then((result) => {
          const token = jwt.sign({ id: id, role: role }, jwtKey);
          console.log("Email changed");
          res.status(200).send({
            jwt: token,
            message: "User email changed succesfully",
          });
        })
        .catch(() => {
          return res
            .status(400)
            .send({ message: "User with this email has already exists" });
        });
    } else return res.status(400).send({ message: "Incorrect password" });
  }

  async changePassword(req, res) {
    const { newPassword, newPasswordConfirmation, currentPassword } = req.body;
    const id = req.user.id;
    const role = req.user.role;
    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).send({ message: "Passwords mismatch" });
    }
    const user = await User.findByPk(id);
    if (user.password !== currentPassword)
      return res
        .status(400)
        .send({ message: "Current password doesn't match" });
    User.update({ password: newPassword }, { where: { id: id } }).then(() => {
      const token = jwt.sign({ id: id, role: role }, jwtKey);
      console.log("Email changed");
      res.status(200).send({
        jwt: token,
        message: "User password changed succesfully",
      });
    });
  }

  async deleteUser(req, res) {
    const userId = req.user.id;
    await User.destroy({
      where: { id: userId },
    })
      .then((result) => {
        res.status(200).send({
          message: "User deleted",
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }
  /*redo*/
  async deleteUserByAdmin(req, res) {
    const userId = req.body.userId;
    await User.destroy({
      where: { id: userId },
    })
      .then((result) => {
        res.status(200).send({
          message: "User deleted",
        });
      })
      .catch((error) => {
        res.status(400).send({ message: error });
      });
  }
  async getUserData(req, res) {
    const id = req.user.id;
    // const role = req.user.role;
    const userPersonalData = await UserPersonalData.findOne({
      where: { userId: id },
    });
    const userWorkData = await UserWorkData.findOne({
      where: { userId: id },
    });
    res.status(200).send({
      jwt: req.body.jwt,
      userData: {
        personal: userPersonalData,
        work: userWorkData,
      },
      message: "User found",
    });
  }

  async saveUserData(req, res) {
    const id = req.user.id;
    const { personalData, workData } = req.body.userData;
    UserPersonalData.findOrCreate({
      where: { userId: id },
      defaults: personalData,
    })
      .then(([userPersonalData, created]) => {
        if (created) {
          console.log("User data created");
        } else {
          return userPersonalData.update(personalData).then(() => {
            console.log("User data upadated");
          });
        }
      })
      .catch((error) => {
        console.error("Error while creating", error);
      });
    UserWorkData.findOrCreate({
      where: { userId: id },
      defaults: workData,
    })
      .then(([userWorkData, created]) => {
        if (created) {
          console.log("User data created");
        } else {
          return userWorkData.update(workData).then(() => {
            console.log("User data upadated");
          });
        }
      })
      .catch((error) => {
        console.error("Error while creating", error);
      });
    res.status(200).send({
      jwt: req.body.jwt,
      message: "User data changed succesfully",
    });
  }
}

module.exports = new userController();
