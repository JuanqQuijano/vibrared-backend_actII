// routes/commentRoutes.js
const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { protect } = require('./middleware/authMiddleware');
const router = express.Router();

// GET /api/comments/post/:postId - Obtener comentarios de un post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId })
      .populate('user_id', 'username profile_picture_url')
      .sort({ createdAt: 'asc' });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/comments - Crear un nuevo comentario (protegido)
router.post('/', protect, async (req, res) => {
  const { post_id, text } = req.body;
  try {
    const newComment = new Comment({
      text,
      post_id,
      user_id: req.user._id,
    });

    const savedComment = await newComment.save();

    // Incrementar contador de comentarios en el Post
    await Post.findByIdAndUpdate(post_id, { $inc: { comments_count: 1 } });
    
    const populatedComment = await savedComment.populate('user_id', 'username profile_picture_url');
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
