import axios from "axios";
import React, { useState } from "react";
import "../stylesheets/Signin.css";

function Signupscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  function sendDetails() {
    const user = {
      name,
      email,
      password,
      cpassword
    }
    if (password === cpassword) {

      axios.post("http://localhost:5000/api/users/signup", user)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      console.log("Passwords should match")
    }
  }

  return (
    <div className="input-container">
      <h1>Sign Up</h1>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="name"
      />
      <input
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="email"
      />
      <input
        type="text"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <input
        type="text"
        onChange={(e) => {
          setCpassword(e.target.value);
        }}
        placeholder="confirm password"
      />
      <button className="btn signup-btn" onClick={sendDetails}>Signup</button>
    </div>
  );
}

export default Signupscreen;
