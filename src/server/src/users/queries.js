const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users where user_id = $1";
const getUserByEmail = "SELECT User_id FROM users where email = $1";
const checkEmailExists = "SELECT email FROM users where email = $1";
const addUser = "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)";
const getUserLoginData =
  "SELECT Email, Password, User_id, Role FROM users where email = $1";

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserLoginData,
  checkEmailExists,
  addUser,
};
