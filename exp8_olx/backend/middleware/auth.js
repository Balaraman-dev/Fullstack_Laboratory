const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  console.log('auth middleware - token header:', authHeader);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    console.log('auth middleware - decoded payload:', payload);
    const user = await User.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = { id: user._id, uname: user.uname, email: user.email };
    next();
  } catch (err) {
    console.error('auth middleware - verify error:', err && err.message);
    res.status(401).json({ message: 'Invalid token', error: err && err.message });
  }
};
