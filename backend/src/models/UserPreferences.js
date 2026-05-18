const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bodyType: { type: String },
  skinTone: { type: String },
  preferredStyle: { type: String },
  comfortLevel: { type: String },
  favoriteColors: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);
