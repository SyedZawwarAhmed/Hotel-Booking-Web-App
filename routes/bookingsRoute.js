const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalAmount, totalDays } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
      transactionid: "3253532",
    });

    await newBooking.save();
    res.send("Room Booked Successfully");
  } catch (error) {
      res.send(error.message)
  }
});

module.exports = router;
