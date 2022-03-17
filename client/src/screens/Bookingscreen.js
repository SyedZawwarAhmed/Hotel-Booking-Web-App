import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/Booking.css";

function Bookingscreen() {
  const { roomid } = useParams();
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [room, setRoom] = useState([]);
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
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="container booking-container">
        <img src={image} alt="" />
        <h1> {room.name} </h1>
        <h2> {room.description} </h2>
        <h2> {room.rentperday} </h2>
        <h2> {room.phonenumber} </h2>
        <h2> {room.maxcount} </h2>
        <h2> {room.type} </h2>
        <button>Book Now</button>
      </div>
    );
  }
}

export default Bookingscreen;
