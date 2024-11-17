const express = require('express'); 
const router = express.Router(); 
const User = require('./models/User'); 

router.post('/users', async (req, res) => {
  const { username, email, uid } = req.body;

  try {
    if (!username || !email || !uid) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = new User({ username, email, uid });
    await newUser.save();

    res.status(201).json({ message: 'User saved successfully' });
  } catch (error) {
    console.error('Error saving user to MongoDB:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
