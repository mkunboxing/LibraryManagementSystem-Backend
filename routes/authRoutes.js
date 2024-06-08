// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/auth/google',
   passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  console.log("redirected")
  res.redirect(process.env.CLIENT_URL);
  // res.redirect("http://localhost:8000/api/current_user");
});

router.get('/api/logout', authController.logout);
router.get('/api/current_user', authController.currentUser);
router.get('/api/protected', authController.protected);

module.exports = router;
