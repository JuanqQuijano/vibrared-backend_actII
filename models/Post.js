const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content_type: { type: String, enum: ['text', 'image', 'video'], required: true },
  text_content: String,
  media_url: String,
  thumbnail_url: String,
  created_at: { type: Date, default: Date.now },
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  tags: [String],
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
