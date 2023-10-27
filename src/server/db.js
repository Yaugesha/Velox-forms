const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "admin",
  port: 5432,
  password: "Xiaomimi2s",
  database: "postgres",
});

module.exports = pool;
