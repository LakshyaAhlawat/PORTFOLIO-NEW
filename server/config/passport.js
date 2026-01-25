const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ahlawat.lakshya.2004@gmail.com';

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails && profile.emails[0] && profile.emails[0].value;
          const googleId = profile.id;

          let user = await User.findOne({ googleId });

          if (!user && email) {
            user = await User.findOne({ email });
          }

          if (!user) {
            const isAdmin = email === ADMIN_EMAIL;
            user = await User.create({
              name: profile.displayName,
              email,
              googleId,
              role: isAdmin ? 'admin' : 'user',
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else {
  // eslint-disable-next-line no-console
  console.warn('Google OAuth environment variables are not set; Google login is disabled.');
}

module.exports = passport;
