const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ahlawat.lakshya.2004@gmail.com';

const signToken = (user) => {
  return jwt.sign(
    {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Passwords do not match',
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists with this email',
      });
    }

    // Only allow signup for the configured admin email for this portfolio
    if (email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Signups are restricted to the portfolio admin email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const token = signToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }

    // Only admins can log in to the admin dashboard
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const token = signToken(user);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// Helper used by Google OAuth callback to issue JWT
exports.issueTokenForUser = (req, res) => {
  const user = req.user;
  const token = signToken(user);
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
