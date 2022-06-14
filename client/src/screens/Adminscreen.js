import React, { useState, useEffect } from "react";
import { Input, Tabs } from "antd";
import axios from "axios";
import "../stylesheets/Adminscreenuser.css";
import "../stylesheets/Adminscreenbooking.css";
import "../stylesheets/Adminscreenaddroom.css";
const { TabPane } = Tabs;

function Adminscreen() {
  const onChange = (key) => {
  };

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(async () => {
      if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
          window.location.href = "/user/signin"
      }
    try {
      const usersData = await axios.get(
        "http://localhost:5000/api/users/getallusers"
      );
      setUsers(usersData.data);

      const bookingsData = await axios.get(
        "http://localhost:5000/api/bookings/getallbookings"
      );
      setBookings(bookingsData.data);

      const roomsData = await axios.get(
        "http://localhost:5000/api/rooms/getallrooms"
      );
      setRooms(roomsData.data.rooms);
    } catch (error) {
      console.log(error);
    }
  }, []);

  let name = "";
  let description = "";
  let maxCount = "";
  let firstImg = "";
  let secondImg = "";
  let thirdImg = "";
  let phoneNumber = "";
  let rentPerDay = "";
  let type = "";
  const addRoom = async () => {
    const body = {
      name,
      description,
      maxCount,
      firstImg,
      secondImg,
      thirdImg,
      phoneNumber,
      rentPerDay,
      type,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/rooms/addroom",
        body
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Panel</h1>

      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Users" key="1">
          <div className="admin-panel-user">
            <div className="admin-panel-user-header">
              <h2>User id</h2>
              <h2>Name</h2>
              <h2>email</h2>
              <h2>Admin</h2>
            </div>
            {users.map((user, i) => {
              return (
                <div className="admin-panel-user-details" key={i}>
                  <p>{user._id}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.isAdmin ? "Yes" : "no"}</p>
                </div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <div className="admin-panel-booking">
            <div className="admin-panel-booking-header">
              <h2>Booking Id</h2>
              <h2>Room Name</h2>
              <h2>User Id</h2>
              <h2>Status</h2>
              <h2>Duration</h2>
              <h2>Amount</h2>
            </div>
            {bookings.map((booking, i) => {
              return (
                <div className="admin-panel-booking-details" key={i}>
                  <p>{booking._id}</p>
                  <p>{booking.room}</p>
                  <p>{booking.userid}</p>
                  <p>{booking.status}</p>
                  <p>
                    {booking.fromdate} to {booking.todate} <br /> (
                    {booking.totaldays} days)
                  </p>
                  <p>{booking.totalamount}</p>
                </div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Rooms" key="3">
          <div className="admin-panel-booking">
            <div className="admin-panel-booking-header">
              <h2>Room Id</h2>
              <h2>Room Name</h2>
              <h2>Max Count</h2>
              <h2>Phone Number</h2>
              <h2>Rent per day</h2>
              <h2>type</h2>
            </div>
            {rooms.map((room, i) => {
              return (
                <div key={i}>
                  <p>{room._id}</p>
                  <p>{room.name}</p>
                  <p>{room.maxcount}</p>
                  <p>{room.phonenumber}</p>
                  <p>{room.rentperday}</p>
                  <p>{room.type}</p>
                </div>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Add Room" key="4">
          <div className="admin-panel-addroom">
            <Input
              onChange={(e) => {
                name = e.target.value;
              }}
              placeholder="Name"
            />
            <Input
              onChange={(e) => {
                description = e.target.value;
              }}
              placeholder="Description"
            />
            <Input
              type="number"
              onChange={(e) => {
                maxCount = e.target.value;
              }}
              placeholder="max count"
            />
            <Input
              onChange={(e) => {
                firstImg = e.target.value;
              }}
              placeholder="1st image url"
            />
            <Input
              onChange={(e) => {
                secondImg = e.target.value;
              }}
              placeholder="2nd image url"
            />
            <Input
              onChange={(e) => {
                thirdImg = e.target.value;
              }}
              placeholder="3rd image url"
            />
            <Input
              onChange={(e) => {
                phoneNumber = e.target.value;
              }}
              placeholder="phone number"
            />
            <Input
              type="number"
              onChange={(e) => {
                rentPerDay = e.target.value;
              }}
              placeholder="rent per day"
            />
            <Input
              onChange={(e) => {
                type = e.target.value;
              }}
              placeholder="type"
            />
            <button className="btn addroom-btn" onClick={addRoom}>
              Done
            </button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;
