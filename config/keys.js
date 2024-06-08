
//  const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.SECRET,
//   baseURL: 'http://localhost:8000',
//   clientID: 'EjpSBhDiRfipRMPWWsp6UOjZ4tDYChjh',
//   issuerBaseURL: 'https://mk-dev-555.us.auth0.com'
// };

// module.exports = config;

require("dotenv").config();

// config/keys.js
module.exports = {
  mongoURI: process.env.MONGODB_URI,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  cookieKey: 'your_cookie_secret_key',
  jwtSecret: 'your-secret-key-here'
};
