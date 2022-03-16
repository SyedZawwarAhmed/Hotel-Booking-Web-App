import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../stylesheets/Booking.css";

function Bookingscreen() {
  const { roomid } = useParams();
  const [image, setImage] = useState("")
  const [room, setRoom] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/rooms/getroom/${roomid}`)
      .then((res) => {
        console.log(res.data.room);
        setRoom(res.data.room);
        setImage(res.data.room.imageurls[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roomid]);
  return (
    <div className="container booking-container">
      <img src={image} alt="" />
      <h1> {room.name} </h1>
      <h2> {room.description} </h2>
      <h2> {room.rentperday} </h2>
      <h2> {room.phonenumber} </h2>
      <h2> {room.maxcount} </h2>
      <h2> {room.type} </h2>
    </div>
  );
}

export default Bookingscreen;
