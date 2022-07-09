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
          currentUser.isAdmin && (
          {
            label: (
              <Link to="/user/admin">
                Admin
              </Link>
            ),
            key: "3",
          }),
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
          <Link className="btn" to="/home">
            <h1>Auberroom</h1>
          </Link>
        </div>
        {currentUser ? (
          
          <Dropdown className="nav-buttons profile-dropdown" overlay={menu} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <h1 className="user-name">{currentUser.name}</h1>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          //   <div className="nav-buttons">
          //     <h1 className="user-name">{currentUser.name}</h1>
          //     <button
          //       className="btn nav-btn signout-btn"
          //       onClick={removeCurrentUser}
          //     >
          //       Signout
          //     </button>
          //     <Link to="/user/profile" className="btn nav-btn profile-btn">
          //       Profile
          //     </Link>
          //     {currentUser.isAdmin && (
          //       <Link to="/user/admin" className="btn nav-btn profile-btn">
          //         Admin
          //       </Link>
          //     )}
          //   </div>
          <div className="nav-buttons">
            <Link to="/user/signup" className="btn nav-btn">
              Singup
            </Link>
            <Link to="/user/signin" className="btn nav-btn">
              Signin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
