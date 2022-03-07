const express = require("express");

const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const Room = require("./models/room");

app.use("/api/rooms", roomsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
