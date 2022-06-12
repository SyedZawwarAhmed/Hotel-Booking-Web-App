const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    roomid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    todate: {
      type: String,
      required: true,
    },
    fromdate: {
      type: String,
      required: true,
    },
    totalamount: {
      type: String,
      required: true,
    },
    totaldays: {
      type: String,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;
