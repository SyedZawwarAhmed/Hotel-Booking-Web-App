import Input from "antd/lib/input/Input";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../configs";
import "../stylesheets/Signin.css";

function Signupscreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function sendDetails() {
    setLoading(true);
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
          .post(
            `${BASE_URL}/api/users/signup`,
            user
          )
          .then(async (res) => {
            await axios
              .post(
                `${BASE_URL}/api/users/signin`,
                user
              )
              .then((res) => {
                console.log(res.data);
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                setLoading(false);
                window.location.href = "/";
              })
              .catch((err) => {
                setLoading(false);
                setError(err.message)
              });
          })
          .catch((err) => {
            console.log("🚀 ~ file: Signupscreen.js:58 ~ sendDetails ~ err", err)
            setLoading(false);
            setError(err.message);
          });
      } else {
        setLoading(false);
        setError("Passwords should match");
      }
    } else {
      setLoading(false);
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
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      />
      <Input
        className="input"
        type="password"
        onChange={(e) => {
          setCpassword(e.target.value);
        }}
        placeholder="confirm password"
      />
      {error !== "" && <label className="error-label">{error}</label>}
      <div>
        <button className="btn signup-btn" onClick={sendDetails}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signupscreen;
