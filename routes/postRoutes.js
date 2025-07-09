// routes/postRoutes.js
const express = require('express');
const Post = require('../models/Post');
const { protect } = require('./middleware/authMiddleware'); // <-- Importar guardián
const router = express.Router();

// Obtener todos los posts (público)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user_id', 'username profile_picture_url')
      .sort({ createdAt: -1 }); // Usar createdAt que Mongoose pone por defecto
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nuevo post (protegido)
router.post('/', protect, async (req, res) => { // <-- Usar guardián aquí
  const { text_content } = req.body;
  
  const post = new Post({
    text_content,
    user_id: req.user._id, // <-- Obtenemos el ID del usuario logueado
    content_type: 'text' // Por simplicidad, solo texto por ahora
  });

  try {
    const newPost = await post.save();
    const populatedPost = await newPost.populate('user_id', 'username profile_picture_url');
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/posts/:id/like - Dar/Quitar Like (protegido)
router.put('/:id/like', protect, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        // Lógica simple: si el usuario ya le dio like, se lo quitamos.
        // Una implementación real guardaría un array de user_ids que dieron like.
        // Por ahora, solo incrementamos/decrementamos para que funcione el click.
        // Para este ejemplo, solo incrementamos. El toggle se manejará en el front.
        post.likes_count = post.likes_count + 1;

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
