import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import "../stylesheets/Profile.css";
import User from "../components/User";
import Bookings from "../components/Bookings";

const { TabPane } = Tabs;

const onChange = (key) => {
  console.log(key);
};

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    if (!user)
    window.location.href = "/user/signin"
  }, [])

  return (
    <div className="container profile">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="User" key="1">
          <User user={user} />
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <Bookings user={user} />
        </TabPane>
      </Tabs>
    </div>
  );
}



export default Profilescreen;
