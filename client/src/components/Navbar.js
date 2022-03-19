import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link className="btn" to="/home">
          <h1>Auberroom</h1>
          </Link>
        </div>
        <div className="nav-buttons">
          <Link to="/user/signup" className="btn nav-btn">Singup</Link>
          <Link to="/user/signin" className="btn nav-btn">Signin</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
