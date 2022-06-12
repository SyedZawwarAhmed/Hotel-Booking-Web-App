import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/Bookings.css";

function Bookings({ user }) {
  let [bookings, setBookings] = useState([]);

  useEffect(async () => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/bookings/getBookings",
        { id: user._id }
      );
      setBookings(data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cancelBooking = async (booking) => {
    try {
      const data = await axios.post(
        "http://localhost:5000/api/bookings/cancelBooking",
        { bookingid: booking._id, roomid: booking.roomid }
      );
      setBookings(() => {
          const filteredbookings = bookings.filter((booking) => booking._id !== data.data._id);
          return filteredbookings;
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bookings">
      {bookings.map((booking) => {
        return (
          <div className="booking" key={booking._id}>
            <div className="col-1">
              <img className="booking-img" src={booking.image} alt="" />
            </div>
            <div className="col-2">
              <h2>Name:- {booking.room}</h2>
              <h2>From:- {booking.fromdate}</h2>
              <h2>To:- {booking.todate}</h2>
              <h2>Amount:- {booking.totalamount}</h2>
              <h2>Status: {booking.status}</h2>
              <button
                className="btn cancel-btn"
                onClick={() => {
                  cancelBooking(booking);
                }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Bookings;
