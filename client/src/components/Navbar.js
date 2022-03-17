import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
          <Link to="/user/signup" className="btn nav-btn">Register</Link>
          <Link to="/user/signin" className="btn nav-btn">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
