const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users where user_id = $1";
const checkEmailExists = "SELECT email FROM users where email = $1";
const addUser =
  "INSERT INTO users (user_id, email, password, role) VALUES ($1, $2, $3, $4)";
const getUserPassword = "SELECT password FROM users where email = $1";

module.exports = {
  getUsers,
  getUserById,
  getUserPassword,
  checkEmailExists,
  addUser,
};
