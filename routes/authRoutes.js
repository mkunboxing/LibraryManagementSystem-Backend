const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/requireAuth');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

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
