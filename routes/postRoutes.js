const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Obtener todos los posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user_id', 'username profile_picture_url')
      .sort({ created_at: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nuevo post
router.post('/', async (req, res) => {
  const post = new Post({
    user_id: req.body.user_id,
    content_type: req.body.content_type,
    text_content: req.body.text_content,
    media_url: req.body.media_url,
    tags: req.body.tags
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
