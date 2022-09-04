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

router.post("/addroom", async (req, res) => {
  try {
    const body = {
      currentbookings: [],
      description: req.body.description,
      imageurls: [req.body.firstImg, req.body.secondImg, req.body.thirdImg],
      maxcount: parseInt(req.body.maxCount),
      name: req.body.name,
      phonenumber: req.body.phoneNumber,
      rentperday: parseInt(req.body.rentPerDay),
      type: req.body.type
    }
    const newRoom = await new Room(body)
    await newRoom.save();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
})

module.exports = router;
