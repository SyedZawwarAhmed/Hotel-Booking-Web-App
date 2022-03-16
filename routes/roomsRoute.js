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

router.get("/getroom/:roomid", async (req, res) => {
  try {
    const room = await Room.findOne({_id: req.params.roomid})
    return res.json({ room });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
})

module.exports = router;
