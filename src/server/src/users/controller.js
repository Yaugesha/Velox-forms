const pool = require("../../db");

const getUsers = (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    console.log("dfs");
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
};
