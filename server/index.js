const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize DB
connectDB();

// Passport config
require('./config/passport');

const app = express();

// CORS setup
// In dev, always reflect the requesting origin so localhost/127.0.0.1 variants work.
// This avoids mismatches when an old CORS_ORIGIN env still points to :3000.
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body parsing
app.use(express.json());

// Passport
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/cv', require('./routes/cv'));
app.use('/api/resume', require('./routes/resume'));

// Static assets (legacy)
app.use('/assets', express.static('assets'));

// Health
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running');
});

// Generic error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});