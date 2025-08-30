const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email, phoneNumber, password, confirmPassword } = req.body;

    if (!fullName || !username || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }, { phoneNumber }] });
    if (exists) return res.status(409).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, username, email, phoneNumber, passwordHash });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

module.exports=router;