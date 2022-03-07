import React, { useState, useEffect } from "react";
import axios from "axios";

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  useEffect(async () => {
    try {
      const data = (await axios.get("api/rooms/getallrooms")).data;
      setRooms(data);
      console.log(data.length);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <h1>Home Screen</h1>
      <h1>There are {rooms.length}</h1>
    </div>
  );
}

export default Homescreen;
