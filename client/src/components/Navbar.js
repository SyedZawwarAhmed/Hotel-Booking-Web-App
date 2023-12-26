import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";

function Navbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let menu;
  if (currentUser) {
    menu = (
      <Menu
        items={[
          {
            label: "Sign out",
            onClick: removeCurrentUser,
            key: "0",
          },
          {
            label: <Link to="/user/profile">Profile</Link>,
            key: "1",
          },
          {
            type: "divider",
          },
          currentUser.isAdmin && {
            label: <Link to="/user/admin">Admin</Link>,
            key: "3",
          },
        ]}
      />
    );
  }

  function removeCurrentUser() {
    console.log("user removed");
    localStorage.removeItem("currentUser");
    window.location.href = "/user/signin";
  }

  return (
    <div className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link className="btn" to="/">
            <h1>Hotelnut</h1>
          </Link>
        </div>
        {currentUser ? (
          <Dropdown
            className="nav-buttons profile-dropdown"
            overlay={menu}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <h1 className="user-name">
                  <img src="/user-icon.png" alt="" />
                </h1>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <div className="nav-buttons">
            <Link to="/user/signup" className="nav-btn">
              Signup
            </Link>
            <Link to="/user/signin" className="nav-btn">
              Signin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
