const express = require("express");

const app = express();
const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");

var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(express.json())
app.use("/api/rooms", roomsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
