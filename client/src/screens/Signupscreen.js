import Input from "antd/lib/input/Input";
import axios from "axios";
import React, { useState } from "react";
import "../stylesheets/Signin.css";

function Signupscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function sendDetails() {
    const user = {
      name,
      email,
      password,
      cpassword,
    };

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (validateEmail(email)) {
      if (password === cpassword) {
        axios
          .post("https://hotel-booking-backend.netlify.app/.netlify/functions/api/users/signup", user)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            setLoading(false);
            setError(err.response.data);
          });
      } else {
        setError("Passwords should match");
      }
    } else {
      setError("Enter a valid email address");
    }
  }

  return (
    <div className="input-container">
      <h1>Sign Up</h1>
      <Input
        className="input"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="name"
      />
      <Input
        className="input"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <Input
        className="input"
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <Input
        className="input"
        type="text"
        onChange={(e) => {
          setCpassword(e.target.value);
        }}
        placeholder="confirm password"
      />
      {error !== "" && <label className="error-label">{error}</label>}
      <button className="btn signup-btn" onClick={sendDetails}>
        Signup
      </button>
    </div>
  );
}

export default Signupscreen;
