const express = require('express');
const Group = require('../models/Group');
const router = express.Router();

// Obtener todos los grupos
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('created_by', 'username profile_picture_url')
      .populate('members', 'username profile_picture_url');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
