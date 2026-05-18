const OutfitAnalysis = require('../models/OutfitAnalysis');
const GeneratedImage = require('../models/GeneratedImage');
const { analyzeStyle } = require('../services/styleAnalysisService');

// @desc    Generate AI Fashion Intelligence Report
// @route   POST /api/tryon/generate
// @access  Public
const generateTryOn = async (req, res) => {
  try {
    const { userImageUrl, outfitImageUrl, userId } = req.body;

    if (!userImageUrl || !outfitImageUrl) {
      return res.status(400).json({ message: 'Both user and outfit images are required' });
    }

    const validUserId = userId || "000000000000000000000000"; 
    
    // Call the local style analysis service
    const analysisData = await analyzeStyle(userImageUrl, outfitImageUrl, validUserId);

    // Save to DB
    const analysis = await OutfitAnalysis.create({
      userId: validUserId,
      outfitImageUrl: outfitImageUrl,
      analysis: analysisData
    });

    const generated = await GeneratedImage.create({
      userId: validUserId,
      originalUserImageUrl: userImageUrl,
      outfitImageUrl: outfitImageUrl,
      // No generatedImageUrl required
      outfitAnalysisId: analysis._id
    });

    res.status(200).json({
      success: true,
      analysis: analysis.analysis,
      originalUserImageUrl: userImageUrl,
      outfitImageUrl: outfitImageUrl, // pass it back for the frontend conceptual preview
      analysisId: analysis._id
    });

  } catch (error) {
    console.error('Analysis Orchestration Error:', error.message);
    res.status(503).json({ message: error.message || 'Analysis Service is currently unavailable. Please try again.' });
  }
};

module.exports = { generateTryOn };
