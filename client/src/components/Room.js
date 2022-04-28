import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Room.css";

function Room({ _id, name, images, description, type, toDate, fromDate }) {
  return (
    <div className="room">
      <img className="room-image" src={images[0]} alt="" />
      <div className="details">
        <h1 className="room-name">{name}</h1>
        <h3>{type}</h3>
        <p>{description}</p>
        <Link className="btn book-btn" to={`/booking/${_id}/${fromDate}/${toDate}`}>
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default Room;
