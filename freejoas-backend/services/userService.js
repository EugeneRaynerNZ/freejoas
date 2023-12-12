
const User = require("../model/User");

function getAllUsers() {
  return User.find();
}

function getUserById(id) {
  return User.findById(id);
}

function createUser(user) {
  return user.save();
}

function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user);
}

function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};