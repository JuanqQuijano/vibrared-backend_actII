const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer_id', 'username profile_picture_url')
      .populate('attendees', 'username profile_picture_url')
      .sort({ start_time: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
