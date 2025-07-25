const jwt = require('jsonwebtoken');


// Get user from jwt token and attach user id to req object
const fetchUser = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchUser;
