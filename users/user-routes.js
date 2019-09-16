const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const restricted = require("../auth/restricted.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ session: req.session });
});

// router.get("/users", restricted, (req, res) => {
router.get("/users", (req, res) => {
    Users.getUsers()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ message: "Error fetching users from database" });
      });
  });
  
router.post("/register", (req, res) => {
    const user = req.body;
    console.log(user);
    if (!user.username || !user.password) {
      return res.status(404).json({ message: "Username or password is missing" });
    }
  
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
  
    Users.add(user)
      .then(added => {
        res.status(201).json({ message: "New Account has been created!" });
      })
      .catch(err => {
        res.status(500).json({ message: "Error adding to database" });
      });
  });
  
router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    Users.findUser({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
        //   req.session.username = user.username;
          res.status(200).json({ message: `${user.username} is logged in` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
});
  

module.exports = router;