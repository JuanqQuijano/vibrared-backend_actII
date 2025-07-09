const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Obtener comentarios de un post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId })
      .populate('user_id', 'username profile_picture_url')
      .sort({ created_at: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear comentario
router.post('/', async (req, res) => {
  const comment = new Comment({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    text: req.body.text
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
