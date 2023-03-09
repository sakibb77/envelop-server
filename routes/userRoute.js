const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getAllUsers,
} = require("../controllers/userController");

const router = express.Router();

//register
router.post("/register", registerUser);
//login
router.post("/login", loginUser);
//user find
router.post("/find/:userId", findUser);
//get all user
router.get("/", getAllUsers);

module.exports = router;
