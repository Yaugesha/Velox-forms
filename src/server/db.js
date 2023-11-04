const Pool = require("pg").Pool;
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;
const host = dotenv.config().parsed.HOST;
const port = dotenv.config().parsed.PORT;

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const sequelize = new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
  dialect: "postgres",
  host,
  port,
});

module.exports = { sequelize, pool };
