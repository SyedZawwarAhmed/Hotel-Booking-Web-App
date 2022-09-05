import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Room.css";

function Room({ _id, name, images, type, toDate, fromDate, rentperday }) {
  return (
    <div className="room">
      <img className="room-image" src={images[0]} alt="" />
      <div className="details">
        <h1 className="room-name">{name}</h1>
        <h3>{type}</h3>
        <h3 className="rent">Rent per day:- Rs. {rentperday}</h3>
        {fromDate &&
          toDate &&
          (JSON.parse(localStorage.getItem("currentUser")) ? (
            <Link
              className="btn book-btn"
              to={`/booking/${_id}/${fromDate}/${toDate}`}
            >
              Book Now
            </Link>
          ) : (
            <h3 className="signin-reminder">Sign in to book</h3>
          ))}
      </div>
    </div>
  );
}

export default Room;
