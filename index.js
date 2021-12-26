const express = require("express");

const app = express();

const dbConfig = require("./db");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

