const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");


router.get("/login/success", async (req, res) => {
    
    if (req.user) {
        const user = req.user._json

        const userInDB = await User.findOne({libraryId: user.email});
        if (!userInDB) {
            const newUser = new User({
                firstName: user.given_name,
                lastName: user.family_name,
                libraryId: user.email,
                image: user.picture,
                sub: user.sub,
                displayName: user.name
            });

            await newUser.save()
        }
        
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user
            
        });
    }else{
        res.status(403).json({
            error: true,
            message: "Not authorized",
        });
    }
});

router.get("/login/filled", (req, res) => {
    
    res.status(401).json({
        error:true,
        message: "User failed to login",
    });
});

router.get("/google/callback", passport.authenticate("google",{
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}));

router.get("/google", passport.authenticate("google",["profile", "email"]));

router.get("/logout", (req, res) => {
    // req.session.destroy();
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router