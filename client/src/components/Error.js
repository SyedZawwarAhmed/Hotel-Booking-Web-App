import React from "react";
import "../stylesheets/Error.css";

function Error({ message }) {
  return (
    <div className="container Error">
      <h1 className="error-message">
        {message}
      </h1>
    </div>
  );
}

export default Error;
