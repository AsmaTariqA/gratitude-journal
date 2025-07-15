import express from 'express';
import connectToMongo from '../config/db.mjs';
import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Connect DB once
connectToMongo();

// Signup Route

router.post('/createuser', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name.length < 3)
    return res.status(400).json({ error: 'Name must be at least 3 characters' });

  if (!email || !email.includes('@'))
    return res.status(400).json({ error: 'Invalid email address' });

  if (!password || password.length < 5)
    return res.status(400).json({ error: 'Password must be at least 5 characters' });
  

  const existingUser = await User.findOne({ $or: [{ email }, { name }] });
  if (existingUser) {
    return res.status(400).json({
      error:
        existingUser.email === email
          ? 'Email already in use'
          : 'Username already in use',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });

  const tokenData = { user: { id: user._id } };
  const authToken = jwt.sign(tokenData, JWT_SECRET);

  return res.status(201).json({
    success: true,
    authToken,
    id: user._id,
    email: user.email,
  });
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: 'Invalid credentials' });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(400).json({ error: 'Invalid credentials' });

  const tokenData = { user: { id: user._id } };
  const authToken = jwt.sign(tokenData, JWT_SECRET);

  return res.status(200).json({ success: true, authToken });
});

export default router;
