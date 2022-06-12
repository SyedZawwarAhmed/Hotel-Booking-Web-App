import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/Booking.css";
import moment from "moment";

function Bookingscreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [room, setRoom] = useState([]);

  const fromdate = moment(fromDate, "DD-MM-YYYY");
  const todate = moment(toDate, "DD-MM-YYYY");
  const totalDays = todate.diff(fromdate, "days") + 1;
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/getroom/${roomid}`)
      .then((res) => {
        console.log(res.data.room);
        setRoom(res.data.room);
        setImage(res.data.room.imageurls[0]);
        setTotalAmount(room.rentperday * totalDays);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [room.rentperday]);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalAmount,
      totalDays,
    };

    try {
      const result = await axios.post(
        "http://localhost:5000/api/bookings/bookroom",
        bookingDetails
      );
      console.log(result);
    } catch (error) {}
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="container booking-container">
        <img className="booking-image" src={image} alt="" />
        <div className="details">
          <h2> {room.name} </h2>
          <h2> {room.rentperday} </h2>
          <h2> {room.phonenumber} </h2>
          <h2> {room.maxcount} </h2>
          <h2> {room.type} </h2>
          <h2> {fromDate} </h2>
          <h2> {toDate} </h2>
          <h2> Total days: {totalDays} </h2>
          <h2> Total Amount: {room.rentperday * totalDays} </h2>
          <button className="" onClick={bookRoom}>
            Pay Now
          </button>
        </div>
      </div>
    );
  }
}

export default Bookingscreen;
