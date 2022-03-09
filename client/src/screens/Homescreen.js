import React, { useState, useEffect } from "react";
import axios from "axios";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  // fetch data from the server
  useEffect(() => {
    axios.get("/api/rooms/getallrooms")
    .then(res => {
      setRooms(res.data.rooms);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  return (
    <div>
      <h1>Home Screen</h1>
      <h1>There are {rooms.length}</h1>
    </div>
  );
}

export default Homescreen;
