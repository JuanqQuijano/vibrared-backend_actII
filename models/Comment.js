const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  likes_count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
