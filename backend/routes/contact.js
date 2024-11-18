const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); 

router.post('/contact', async (req, res) => {
  console.log('Received data:', req.body); 

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save(); 
    console.log('Contact saved successfully');
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
