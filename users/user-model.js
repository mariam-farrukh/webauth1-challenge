const db = require("../data/db-config.js");

module.exports = {
  getUsers,
  findUser,
  add
};

function getUsers() {
  return db("users").select("id", "username", "password");
}

function add(user) {
  return db("users").insert(user);
}

function findUser(username) {
  return db("users").where(username);
}