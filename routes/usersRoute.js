const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    const newUser = await new User(req.body)
    newUser.save((err, user) => {
        res.send("Registered Successfully")
    })
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;
