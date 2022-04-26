import React, { useState } from "react";
import axios from "axios";
import "../stylesheets/Signin.css";

function Signinscreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  async function signin() {
    if (validateEmail(email)) {
      const user = {
        email,
        password,
      };

      await axios
        .post("http://localhost:5000/api/users/signin", user)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          window.location.href = "/home";
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("enter a valid email address");
    }
  }

  return (
    <div className="input-container">
      <h1>Sign in</h1>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button className="btn signup-btn" onClick={signin}>
        Signin
      </button>
    </div>
  );
}

export default Signinscreen;
