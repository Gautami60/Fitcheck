const mongoose = require('mongoose');

const outfitAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  outfitImageUrl: {
    type: String,
    required: true
  },
  analysis: {
    suitabilityScore: Number,
    styleMatch: [{
      style: String,
      percentage: Number
    }],
    bodyCompatibility: String,
    colorCompatibility: {
      recommended: [String],
      avoid: [String]
    },
    fitRecommendations: {
      best: String,
      moderate: String,
      avoid: String
    },
    occasionMatch: [String],
    stylingSuggestions: String
  }
}, { timestamps: true });

module.exports = mongoose.model('OutfitAnalysis', outfitAnalysisSchema);
