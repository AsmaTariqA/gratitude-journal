import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export default async function fetchUser(req, res) {
  const token = req.headers['auth-token'];
  if (!token) {
    res.status(401).json({ error: 'Please authenticate with a valid token' });
    return null;
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    return req.user;
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
    return null;
  }
}
