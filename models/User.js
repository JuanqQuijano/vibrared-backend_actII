const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  profile_picture_url: String,
  bio: String,
  registration_date: { type: Date, default: Date.now },
  last_login: Date,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups_joined: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
