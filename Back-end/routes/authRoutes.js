
const express = require('express');
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User'); // Import your User model

const router = express.Router();

// Configure Passport Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`, // Backend URL for callback
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create user in the database
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        picture: profile.photos[0].value,
                    });
                    await user.save();
                }
                return done(null, user); // Pass user to session
            } catch (err) {
                return done(err); // Handle error
            }
        }
    )
);

// Redirect user to Google for login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle callback after Google login
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        console.log(`Google callback reached.`);
        res.redirect(`${process.env.FRONTEND_URL}/?auth=true`); // Redirect to frontend
    }
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: 'Failed to log out' });
        res.redirect(`${process.env.FRONTEND_URL}/`); // Redirect to frontend login
    });
});

module.exports = router;