// routes/auth.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const keys = require('../config/keys');
require('dotenv').config();
router.post('/signup', async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ libraryId: email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const user = new User({
      firstName,
      libraryId: email,
      displayName: `${firstName}`,
      password,
    });

    await user.save();
    const payload = { id: user.id, displayName: user.displayName };
    const token = jwt.sign(payload, keys.jwtSecret, { expiresIn: '12h' });

    res.status(201).json({ token, user, redirectUrl: `${process.env.CLIENT_URL}/dashboard` });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
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
});

const authMiddleware = require('../middleware/requireAuth');

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
