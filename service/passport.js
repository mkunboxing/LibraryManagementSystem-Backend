// services/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = require('../models/user'); // Import your User model

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ libraryId: profile.emails[0].value });
  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = await new User({
    libraryId: profile.emails[0].value,
    displayName: profile.displayName,
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value,
    image: profile.photos[0].value,
    sub: profile.sub, // Assuming 'sub' is the field for Google's unique user ID
  }).save();
  
  done(null, newUser);
}));
