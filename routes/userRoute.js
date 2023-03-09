const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

//routes
router.post("/register", registerUser);
//routes
router.post("/login", loginUser);

module.exports = router;
