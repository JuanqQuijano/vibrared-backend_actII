// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Función para generar un token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// POST /api/users/login - Iniciar Sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profile_picture_url: user.profile_picture_url,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Usuario o contraseña inválidos' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users - Obtener todos los usuarios (Ruta existente)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password_hash');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
