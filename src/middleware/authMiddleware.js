// src/middleware/authMiddleware.js
const { verifyIdToken, admin } = require('../firebase/firebaseAdmin');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return res.status(401).json({ message: 'No token provided' });

    const idToken = match[1];

    // Verify and decode Firebase token
    const decoded = await verifyIdToken(idToken);

    // 🔥 Fetch user's token validity info
    const userRecord = await admin.auth().getUser(decoded.uid);
    const authTime = decoded.auth_time * 1000; // convert seconds → ms
    const validAfter = new Date(userRecord.tokensValidAfterTime).getTime();

    // 🚨 Check if the token was issued before logout/revoke
    if (authTime < validAfter) {
      return res.status(401).json({
        message: 'Token has been revoked. Please log in again.',
      });
    }

    // ✅ Attach minimal user info to request
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
