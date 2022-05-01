const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment")
const Room = require("../models/room")

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalAmount, totalDays } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: totalAmount,
      totaldays: totalDays,
      transactionid: "3253532",
    });

    const booking = await newBooking.save();

    const tempRoom = await Room.findOne({_id: room._id})

    tempRoom.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        userid,
        status: booking.status
    })

    await tempRoom.save();

    res.send("Room Booked Successfully");
  } catch (error) {
      res.send(error.message)
  }
});

module.exports = router;
