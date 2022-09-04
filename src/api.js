const express = require("express");
const serverless = require("serverless-http");

const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute")
const bookingsRoute = require("./routes/bookingsRoute")

var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute)
app.use("/bookings", bookingsRoute)

const port = process.env.PORT || 5000;

app.use(`/.netlify/functions/api`, router);
module.exports = app;
module.exports.handler = serverless(app)
