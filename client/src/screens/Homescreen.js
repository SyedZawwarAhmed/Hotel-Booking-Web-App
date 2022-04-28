import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Room from "../components/Room";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import "../stylesheets/Home.css";

function Homescreen() {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  // fetch data from the server
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms/getallrooms")
      .then((res) => {
        console.log(res.data.rooms);
        setRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"))
    setToDate(moment(dates[1]).format("DD-MM-YYYY"))
  }

  return (
    <>
      <div className="rooms-container">
        <div className="row">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        {rooms.map((room, index) => (
          <Room
            key={index}
            _id={room._id}
            name={room.name}
            images={room.imageurls}
            description={room.description}
            type={room.type}
            fromDate={fromDate}
            toDate={toDate}
          />
        ))}
      </div>
    </>
  );
}

export default Homescreen;
