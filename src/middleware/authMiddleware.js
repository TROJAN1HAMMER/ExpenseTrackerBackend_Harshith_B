// src/middleware/authMiddleware.js
const { verifyIdToken } = require('../firebase/firebaseAdmin');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return res.status(401).json({ message: 'No token provided' });

    const idToken = match[1];
    const decoded = await verifyIdToken(idToken);
    // attach minimal user info
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
    };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err.message || err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
