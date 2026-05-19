const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalUserImageUrl: {
    type: String,
    required: true
  },
  outfitImageUrl: {
    type: String,
    required: true
  },
  generatedImageUrl: {
    type: String,
    required: true
  },
  outfitAnalysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OutfitAnalysis'
  }
}, { timestamps: true });

module.exports = mongoose.model('GeneratedImage', generatedImageSchema);
