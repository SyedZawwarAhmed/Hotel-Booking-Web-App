import React from "react";
import "../stylesheets/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <h1>Auberroom</h1>
        </div>
        <div className="nav-buttons">
          <button className="btn nav-btn">Register</button>
          <button className="btn nav-btn">Login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
