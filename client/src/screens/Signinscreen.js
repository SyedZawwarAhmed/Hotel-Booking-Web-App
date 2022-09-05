import React, { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import "../stylesheets/Signin.css";

function Signinscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function signin() {
    setLoading(true);
    if (validateEmail(email)) {
      const user = {
        email,
        password,
      };

      await axios
        .post("https://hotel-booking-backend.netlify.app/.netlify/functions/api/users/signin", user)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          setLoading(false);
          window.location.href = "/";
        })
        .catch((err) => {
          setLoading(false);
          setError(err.response.data);
        });
    } else {
      setError("Invalid email");
      setLoading(false);
    }
  }

  return (
    <div className="input-container container">
      <h1>Sign in</h1>
      <Input
        className="input"
        type="text"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        className="input"
        type="password"
        placeholder="password"
        status=""
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error !== "" && <label className="error-label">{error}</label>}
      <button
        className={loading ? "btn signup-btn disabled" : "btn signup-btn"}
        onClick={signin}
      >
        Signin
      </button>
    </div>
  );
}

export default Signinscreen;
