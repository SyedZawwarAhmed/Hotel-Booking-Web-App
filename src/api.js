const express = require("express");
const serverless = require("serverless-http");

const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

var cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/.netlify/functions/api/rooms", roomsRoute);
app.use("/.netlify/functions/api/users", usersRoute);
app.use("/.netlify/functions/api/bookings", bookingsRoute);

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
module.exports.handler = serverless(app);
