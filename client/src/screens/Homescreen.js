import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Room from "../components/Room";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import "../stylesheets/Home.css";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { BASE_URL } from "../configs";

function Homescreen() {
  const { RangePicker } = DatePicker;
  const [rooms, setRooms] = useState([]);
  const [tempRooms, setTempRooms] = useState([]);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dropdownLabel, setDropdownLabel] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch data from the server
  useEffect(async () => {
    try {
      const data = await axios.get(
        `${BASE_URL}/api/rooms/getallrooms`
      );
      setRooms(data.data.rooms);
      setTempRooms(data.data.rooms);
      setLoading(false);
    } catch (error) {
      console.log(error.message)
      setLoading(false);
      setError(error.message);
    }
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));
  }

  const handleButtonClick = (e) => {};

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      setDropdownLabel("All");
      setRooms(tempRooms);
    } else if (e.key === "2") {
      setDropdownLabel("Delux");
      setRooms(() => {
        return tempRooms.filter((room) => room.type === "Delux");
      });
    } else if (e.key === "3") {
      setDropdownLabel("Non-Delux");
      setRooms(() => {
        return tempRooms.filter((room) => room.type === "Non-Delux");
      });
    }
  };

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setRooms(() => {
      return tempRooms.filter((room) =>
        room.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
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
      {loading ? (
        <Loading />
      ) : error !== "" ? (
        <Error message={error} />
      ) : (
        <div className="container rooms-container">
          <div className="row">
            <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
            <Input
              placeholder="Search"
              onChange={(e) => handleInput(e)}
              onKeyUp={handleSearch}
            />

            <Dropdown.Button
              className="dropdown"
              onClick={handleButtonClick}
              overlay={menu}
            >
              {dropdownLabel}
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
                rentperday={room.rentperday}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default Homescreen;
