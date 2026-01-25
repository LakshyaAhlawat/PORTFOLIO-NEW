const User = require('../models/User');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ahlawat.lakshya.2004@gmail.com';

module.exports = async function (req, res, next) {
  const user = await User.findById(req.user.id);
  const isAuthorizedAdmin = user && user.role === 'admin' && user.email === ADMIN_EMAIL;

  if (!isAuthorizedAdmin) {
    return res.status(403).json({
      message: 'Access denied. Admins only.',
    });
  }

  next();
};