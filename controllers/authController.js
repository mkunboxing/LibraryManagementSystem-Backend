// controllers/authController.js
exports.currentUser = (req, res) => {
    res.send(req.user);
    console.log("this is from controller ",req.session)
    console.log("this is from controller current user",req.user)
    // console.log("this is req", req);
  };
  
exports.logout = (req, res) => {
  // Call req.logout() with a callback function
  req.logout(() => {
    // Logout successful, send response or redirect
    res.send("Logout successful"); // Example response
  });
};
  
  exports.protected = (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send('You must log in!');
    }
    res.send('This is a protected route');
  };
  