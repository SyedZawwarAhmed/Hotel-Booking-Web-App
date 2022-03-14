import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import "../stylesheets/Home.css"

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  // fetch data from the server
  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms/getallrooms")
    .then(res => {
      console.log(res.data.rooms)
      setRooms(res.data.rooms);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  return (
    <div class="rooms-container">
      {rooms.map((room, index) => <Room key={index} name={room.name} images={room.imageurls} description={room.description} type={room.type} />)}
    </div>
  );
}

export default Homescreen;
