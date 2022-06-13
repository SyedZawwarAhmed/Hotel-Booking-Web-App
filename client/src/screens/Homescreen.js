import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Room from "../components/Room";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { Input } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import "../stylesheets/Home.css";

function Homescreen() {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [tempRooms, setTempRooms] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  // fetch data from the server
  useEffect(async () => {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/rooms/getallrooms"
      );
      setRooms(data.data.rooms);
      setTempRooms(data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));
  }

  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      setRooms(tempRooms);
    } else if (e.key === "2") {
      setRooms(() => {
        return tempRooms.filter((room) => room.type === "Delux");
      });
    } else if (e.key === "3") {
      setRooms(() => {
        return tempRooms.filter((room) => room.type === "Non-Delux");
      });
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "all",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "delux",
          key: "2",
          icon: <UserOutlined />,
        },
        {
          label: "non-delux",
          key: "3",
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  return (
    <>
      <div className="rooms-container">
        <div className="row">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
          <Input placeholder="Search" />

          <Dropdown.Button
            className="dropdown"
            onClick={handleButtonClick}
            overlay={menu}
          >
            Dropdown
          </Dropdown.Button>
        </div>
        {rooms
          .filter((room) => {
            let showRoom = true;
            if (room.currentbookings.length > 0) {
              for (const currentbooking of room.currentbookings) {
                if (
                  moment(fromDate, "DD-MM-YYYY").isBetween(
                    moment(currentbooking.fromdate, "DD-MM-YYYY"),
                    moment(currentbooking.todate, "DD-MM-YYYY"),
                    undefined,
                    "[]"
                  ) ||
                  moment(toDate, "DD-MM-YYYY").isBetween(
                    moment(currentbooking.fromdate, "DD-MM-YYYY"),
                    moment(currentbooking.todate, "DD-MM-YYYY"),
                    undefined,
                    "[]"
                  ) ||
                  moment(currentbooking.fromdate, "DD-MM-YYYY").isBetween(
                    moment(fromDate, "DD-MM-YYYY"),
                    moment(toDate, "DD-MM-YYYY"),
                    undefined,
                    "[]"
                  ) ||
                  moment(currentbooking.todate, "DD-MM-YYYY").isBetween(
                    moment(fromDate, "DD-MM-YYYY"),
                    moment(toDate, "DD-MM-YYYY"),
                    undefined,
                    "[]"
                  )
                ) {
                  showRoom = false;
                }
              }
            }
            if (showRoom) {
              return room;
            }
          })
          .map((room, index) => (
            <Room
              key={index}
              _id={room._id}
              name={room.name}
              images={room.imageurls}
              description={room.description}
              type={room.type}
              fromDate={fromDate}
              toDate={toDate}
              currentBookings={room.currentbookings}
            />
          ))}
      </div>
    </>
  );
}

export default Homescreen;
