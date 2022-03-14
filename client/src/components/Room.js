import React from "react";
import "../stylesheets/Room.css";

function Room({ name, images, description, type }) {
  return (
    <div className="room">
      <img class="room-image" src={images[0]} alt="" />
      <div className="details">
        <h1 className="room-name">{name}</h1>
        <h3>{type}</h3>
        <p>{description}</p>
        <button className="btn book-btn">Book Now</button>
      </div>
    </div>
  );
}

export default Room;
