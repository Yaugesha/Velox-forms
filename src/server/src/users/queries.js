const getUsers = "SELECT * FROM users";
const getUserById = "SELECT Email, Password FROM users WHERE user_id = $1";
const getUserByEmail = "SELECT User_id FROM users WHERE email = $1";
const checkEmailExists = "SELECT email FROM users WHERE email = $1";
const addUser = "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)";
const getUserLoginData =
  "SELECT Email, Password, User_id, Role FROM users WHERE email = $1";
const changeUserEmail = "UPDATE users SET email = $2 WHERE email = $1";

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserLoginData,
  checkEmailExists,
  addUser,
  changeUserEmail,
};
