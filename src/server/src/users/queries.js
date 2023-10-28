const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users where user_id = $1";
const checkEmailExists = "SELECT email FROM users where email = $1";
const addUser =
  "INSERT INTO users (user_id, email, password, role) VALUES ($1, $2, $3, $4)";
const getUserLoginData =
  "SELECT Email, Password, User_id FROM users where email = $1";

module.exports = {
  getUsers,
  getUserById,
  getUserLoginData,
  checkEmailExists,
  addUser,
};
