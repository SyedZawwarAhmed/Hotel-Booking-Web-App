import React, { useState, useEffect } from "react";
import axios from "axios";
import "../stylesheets/Bookings.css";
import Loading from "./Loading";
import Error from "./Error";

function Bookings({ user }) {
  let [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(async () => {
    try {
      const data = await axios.post(
        "https://hotel-booking-backend.netlify.app/.netlify/functions/api/bookings/getBookings",
        { id: user._id }
      );
      setBookings(data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const cancelBooking = async (booking) => {
    try {
      setLoading(true);
      const data = await axios.post(
        "https://hotel-booking-backend.netlify.app/.netlify/functions/api/bookings/cancelBooking",
        { bookingid: booking._id, roomid: booking.roomid }
      );
      setBookings(() => {
        const filteredbookings = bookings.map((booking) => {
          if (data.data._id === booking._id) {
            booking.status = "Cancelled";
          }
          return booking;
        });
        return filteredbookings;
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error !== "" ? (
        <Error message={error} />
      ) : (
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
                  {booking.status === "booked" && (
                    <button
                      className="btn cancel-btn"
                      onClick={() => {
                        cancelBooking(booking);
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Bookings;
