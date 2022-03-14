const mongoose = require("mongoose");

var mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

var connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
