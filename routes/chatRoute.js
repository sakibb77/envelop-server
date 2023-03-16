const express = require("express");
const {
  createChat,
  findAllChats,
  findSingleChat,
} = require("../controllers/chatController");

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", findAllChats);
router.post("/find/:firstId/:secondId", findSingleChat);

module.exports = router;
