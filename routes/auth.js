// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// require("dotenv").config();

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


// // Google Sign-In route
// router.post("/google-login", async (req, res) => {
//   const { tokenId } = req.body;

//   try {
//     // Verify the Google token and get user information
//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
//     });
//     const payload = ticket.getPayload();

//     // Check if the user already exists in your database
//     let user = await User.findOne({ libraryId: payload.email });
//     if (!user) {
//       // If user doesn't exist, create a new user with Google account details
//       user = new User({
//         firstName: payload.given_name,
//         lastName: payload.family_name,
//         libraryId: payload.email,
//         image: payload.picture,
//         displayName: payload.name,
//       });
//       await user.save();
//     }

//     // Generate JWT token for the user
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     // Send the token and user details in response
//     res.json({ token, user });
//   } catch (error) {
//     console.error("Error signing in with Google:", error);
//     res.status(500).send("Error signing in with Google");
//   }
// });

// router.post("/email-signup", async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     // Check if a user with the provided email already exists
//     let user = await User.findOne({ libraryId: email });
//     if (user) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     // Create a new user with the provided details
//     user = new User({
//       libraryId: email,
//       displayName: name,
//       // You can add additional user details here if necessary
//     });

//     // Set and hash the password
//     user.password = bcrypt.hashSync(password, 10);
    
//     // Save the user record to the database
//     await user.save();

//     // Generate JWT token for the user
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     // Send the token and user details in response
//     res.json({ token, user });
//   } catch (error) {
//     console.error("Error signing up with email:", error);
//     res.status(500).send("Error signing up with email");
//   }
// });

// // Email Log-In route
// router.post("/email-login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email in the database
//     const user = await User.findOne({ libraryId: email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Compare the provided password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT token for the user
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     // Send the token and user details in response
//     res.json({ token, user });
//   } catch (error) {
//     console.error("Error signing in with email/password:", error);
//     res.status(500).send("Error signing in with email/password");
//   }
// });

// // Logout route
// router.get("/logout", (req, res) => {
//   // Clear the session or token (depending on your authentication mechanism)
//   // For example, if using JWT token-based authentication:
//   res.clearCookie("token"); // Clear the token cookie
//   res.json({ message: "Logged out successfully" });
// });

// // // User route
// // router.get("/user", requiresAuth(), async (req, res) => {
// //   try {
// //     // Fetch user details from the database based on the user ID stored in the JWT token
// //     const user = await User.findById(req.oidc.user.sub);
// //     if (!user) {
// //       return res.status(404).json({ error: "User not found" });
// //     }
// //     res.json(user);
// //   } catch (error) {
// //     console.error("Error fetching user details:", error);
// //     res.status(500).send("Error fetching user details");
// //   }
// // });

// module.exports = router;
