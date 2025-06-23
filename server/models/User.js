const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  oauthProvider: {
    type: String,
  },
  oauthId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('User', UserSchema);