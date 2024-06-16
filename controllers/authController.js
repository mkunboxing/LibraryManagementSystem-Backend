
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const keys = require("../config/keys");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ libraryId: email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const user = new User({
      libraryId: email,
      displayName: `${name}`,
      password,
    });

    await user.save();
    const payload = { id: user.id, displayName: user.displayName };
    const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: "12h" });

    res
      .status(201)
      .json({
        token,
        user,
        redirectUrl: `${process.env.CLIENT_URL}/dashboard`,
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ libraryId: email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid email or password');
    }

    const payload = { id: user.id, displayName: user.displayName };
    const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: '12h' });

    res.json({ token, user, redirectUrl: `${process.env.CLIENT_URL}/dashboard` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
