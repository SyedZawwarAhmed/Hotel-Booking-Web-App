const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalAmount, totalDays, image } =
    req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalamount: totalAmount,
      totaldays: totalDays,
      image,
      transactionid: "3253532",
    });

    const booking = await newBooking.save();

    const tempRoom = await Room.findOne({ _id: room._id });

    tempRoom.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      userid,
      status: booking.status,
    });

    await tempRoom.save();

    res.send("Room Booked Successfully");
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/getBookings", async (req, res) => {
  try {
    const bookings = await Booking.find({ userid: req.body.id });
    res.send(bookings);
  } catch (error) {
    res.send(error);
  }
});

router.post("/cancelBooking", async (req, res) => {
  try {
    const { bookingid, roomid } = req.body;
    const cancelledBooking = await Booking.findOne({ _id: bookingid });
    cancelledBooking.status = "Cancelled";
    cancelledBooking.save();

    const tempRoom = await Room.findOne({ _id: roomid });
    tempRoom.currentbookings = tempRoom.currentbookings.filter(
      (booking) => booking.bookingid.toString() !== bookingid
    );
    await tempRoom.save();
    res.send(cancelledBooking);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
