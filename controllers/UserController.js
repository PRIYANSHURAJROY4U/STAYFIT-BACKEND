// controllers/userController.js
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User with this email already exists' });
    }

    // Check if username is already taken
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username is already taken' });
    }

    // Create new user
    user = new User({
      email,
      username,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();

    // Generate JWT
    const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1h' });
  
      // Set token as HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict', // Helps with CSRF attacks
        maxAge: 3600000, // 1 hour
      });
  

    res.status(201).json({ msg: 'User registered successfully, lets dive into a fitness arsenal' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1h' });
  
      // Set token as HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 3600000,
      });
  
      res.json({ msg: 'Login successful' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };