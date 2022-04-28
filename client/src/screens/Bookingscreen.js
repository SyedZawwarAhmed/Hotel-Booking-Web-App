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
  const totalDays = fromdate.diff(todate, "days") + 1;


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/getroom/${roomid}`)
      .then((res) => {
        console.log(res.data.room);
        setRoom(res.data.room);
        setImage(res.data.room.imageurls[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [roomid]);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid : JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totalDays
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="container booking-container">
        <img className="booking-image" src={image} alt="" />
        <div className="details">
          <h1> {room.name} </h1>
          {/* <h2> {room.description} </h2> */}
          <h2> {room.rentperday} </h2>
          <h2> {room.phonenumber} </h2>
          <h2> {room.maxcount} </h2>
          <h2> {room.type} </h2>
          <h2> {fromDate} </h2>
          <h2> {toDate} </h2>
          <h2> Total days: {totalDays} </h2>
          <h2> Total Amount: {room.rentperday * totalDays} </h2>
          <button onClick={bookRoom}>Pay Now</button>
        </div>
      </div>
    );
  }
}

export default Bookingscreen;
