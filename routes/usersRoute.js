const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    if ((await User.findOne({ email: req.body.email })) == null) {
      const newUser = await new User(req.body);
      newUser.save((err, user) => {
        res.send("Registered Successfully");
      });
    } else {
      res.send("User already exists");
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const userToBeSent = {
        name: user.name,
        email: user.email, 
        isAdmin: user.isAdmin,
        _id: user._id
      }
      res.send(userToBeSent);
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
