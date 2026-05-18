const OutfitAnalysis = require('../models/OutfitAnalysis');
const GeneratedImage = require('../models/GeneratedImage');

// @desc    Get user try-on history
// @route   GET /api/history
// @access  Public (mocked for demo)
const getHistory = async (req, res) => {
  try {
    const userId = req.query.userId || "000000000000000000000000"; // Dummy ID for MVP

    const history = await GeneratedImage.find({ userId })
      .populate('outfitAnalysisId')
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHistory };
