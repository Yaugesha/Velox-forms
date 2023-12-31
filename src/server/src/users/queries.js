const getUsers = "SELECT * FROM users";
const getUserById = "SELECT Email, Password FROM users WHERE d = $1";
const getUserByEmail = "SELECT Id FROM users WHERE email = $1";
const getUserPassword = "SELECT Password FROM users WHERE d = $1";
const checkEmailExists = "SELECT email FROM users WHERE email = $1";
const addUser = "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)";
const getUserLoginData =
  "SELECT Email, Password, Id, Role FROM users WHERE email = $1";
const changeUserEmail = "UPDATE users SET email = $2 WHERE email = $1";
const changeUserPassword = "UPDATE users SET password = $2 WHERE id = $1";

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserPassword,
  getUserLoginData,
  checkEmailExists,
  addUser,
  changeUserEmail,
  changeUserPassword,
};
