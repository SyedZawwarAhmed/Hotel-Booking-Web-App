const express = require("express");
const router = express.Router();
const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
