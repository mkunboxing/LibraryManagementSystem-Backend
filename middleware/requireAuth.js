// middleware/auth.js
// const requireAuth = (req, res, next) => {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.status(401).json({ error: 'Unauthorized' });
//   };
  
//   module.exports = requireAuth;


require('dotenv').config();


// requireAuth.js
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

module.exports = checkJwt;
