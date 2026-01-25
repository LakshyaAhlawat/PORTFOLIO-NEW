const express = require('express');
const passport = require('passport');
const router = express.Router();
const { signup, login, issueTokenForUser } = require('../controllers/authController');

// Local auth
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth (Passport Google Strategy)
// Starts the Google OAuth flow
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback URL configured in Google Console
router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	issueTokenForUser
);

// Optional: POST /auth/google to initiate redirect-friendly flow from SPA
router.post(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

module.exports = router;
