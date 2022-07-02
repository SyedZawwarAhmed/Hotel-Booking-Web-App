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
    const user = await User.findOne({ email: email});
    if (user) {
      if(password === user.password) {
        
        const userToBeSent = {
          name: user.name,
          email: user.email, 
          isAdmin: user.isAdmin,
          _id: user._id
        }
        res.send(userToBeSent);
      } else {
        return res.status(400).send("Password is incorrect");
      }
    } else {
      return res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({})
    const usersToBeSent = users.map(user => {
      return {
        name: user.name,
        email: user.email, 
        isAdmin: user.isAdmin,
        _id: user._id
      }
    })
    res.send(usersToBeSent)
  } catch (error) {
    res.status(400).send({error})
  }
})

module.exports = router;
