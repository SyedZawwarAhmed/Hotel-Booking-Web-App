import React, { useState, useEffect } from "react";
import { Input, Tabs } from "antd";
import axios from "axios";
import "../stylesheets/Adminscreenuser.css";
import "../stylesheets/Adminscreenbooking.css";
import "../stylesheets/Adminscreenaddroom.css";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { BASE_URL } from "../configs";
const { TabPane } = Tabs;

function Adminscreen() {
  const onChange = (key) => {};

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [defaultTab, setDefaultTab] = useState("1");

  useEffect(async () => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/user/signin";
    }
    try {
      const usersData = await axios.get(
        `${BASE_URL}/api/users/getallusers`
      );
      setUsers(usersData.data);

      const bookingsData = await axios.get(
        `${BASE_URL}/api/bookings/getallbookings`
      );
      setBookings(bookingsData.data);

      const roomsData = await axios.get(
        `${BASE_URL}/api/rooms/getallrooms`
      );
      setRooms(roomsData.data.rooms);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
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
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/rooms/addroom`,
        body
      );
      defaultTab = "4";
      setLoading(false);
    } catch (error) {
      setDefaultTab("4");
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error !== "" ? (
        <Error message={error} />
      ) : (
        <div className="container">
          <h1>Admin Panel</h1>

          <Tabs defaultActiveKey={defaultTab} onChange={onChange}>
            <TabPane tab="Users" key="1">
              <div className="admin-panel-user">
                {users.map((user, i) => {
                  return (
                    <div key={i}>
                      <div className="admin-panel-user-header">
                        <h2>User id</h2>
                        <h2>Name</h2>
                        <h2>email</h2>
                        <h2>Admin</h2>
                      </div>
                      <div className="admin-panel-user-details">
                        <p>{user._id}</p>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.isAdmin ? "Yes" : "no"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab="Bookings" key="2">
              <div className="admin-panel-booking">
                {bookings.map((booking, i) => {
                  return (
                    <div key={i}>
                      <div className="admin-panel-booking-header">
                        <h1>Booking Id</h1>
                        <h1>Room Name</h1>
                        <h1>User Id</h1>
                        <h1>Status</h1>
                        <h1>Duration</h1>
                        <h1>Amount</h1>
                      </div>
                      <div className="admin-panel-booking-details">
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
                    </div>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab="Rooms" key="3">
              <div className="admin-panel-room">
                {rooms.map((room, i) => {
                  return (
                    <div key={i}>
                      <div className="admin-panel-booking-header">
                        <h2>Room Id</h2>
                        <h2>Room Name</h2>
                        <h2>Max Count</h2>
                        <h2>Phone Number</h2>
                        <h2>Rent per day</h2>
                        <h2>type</h2>
                      </div>
                      <div>
                        <p>{room._id}</p>
                        <p>{room.name}</p>
                        <p>{room.maxcount}</p>
                        <p>{room.phonenumber}</p>
                        <p>{room.rentperday}</p>
                        <p>{room.type}</p>
                      </div>
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
      )}
    </>
  );
}

export default Adminscreen;
