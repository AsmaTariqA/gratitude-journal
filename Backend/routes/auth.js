const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Replace with the correct path to your User model
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'asmaisagoodg!rl'; 

// ...

// ROOUTE: 1 Create a user
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    let errors = {};

    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return res.status(400).json({ errors: validationErrors.array() });
      }

      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { name: req.body.name }],
      });

      if (existingUser) {
        if (existingUser.email === req.body.email) {
          errors.email = 'Email already in use';
        }

        if (existingUser.name === req.body.name) {
          errors.name = 'Username already in use';
        }
      }

      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success, errors });
      }

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(201).json({ success, authToken, id: user.id, email: user.email });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
);




// ROUTE : 2 Authenticate a user
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Please try to login with correct credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success ,error: 'Please try to login with correct credentials' });
      }

      const data = {
        user: {
          id: user._id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
);


// ROUTE : 3 , Get loggedin User's detail. Login required
router.post(
  '/getuser', fetchUser , async (req, res) => {

try {
  let userId = req.user.id;
  const user = await User.findById(userId).select('-password')
  res.send(user);
} catch (error) {
  console.error(error);
  res.status(500).send({ error: 'Internal server error' });
}
  })
module.exports = router;

       
