const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  organizer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  location: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  event_picture_url: String
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
