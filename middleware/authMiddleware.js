const jwt = require('jsonwebtoken');

// Use environment variable or fallback (only for dev)
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '🚫 No token provided. Unauthorized access.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId || decoded.id; // support both keys
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ message: '🚫 Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
