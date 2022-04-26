import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";

function Navbar() {
  
  const currentUser = 
    JSON.parse(localStorage.getItem("currentUser"))


  function removeCurrentUser() {
    console.log("user removed");
    localStorage.removeItem("currentUser");
    window.location.href = "/user/signin"
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
          <div className="nav-buttons">
            <h1 className="user-name">{currentUser.name}</h1>
            <button className="btn nav-btn signout-btn" onClick={removeCurrentUser}>
              Signout
            </button>
          </div>
        ) : (
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
