const OutfitAnalysis = require('../models/OutfitAnalysis');
const GeneratedImage = require('../models/GeneratedImage');
const { analyzeStyle } = require('../services/styleAnalysisService');

// @desc    Generate AI Fashion Intelligence Report & Style Preview
// @route   POST /api/tryon/generate
// @access  Public
const generateTryOn = async (req, res) => {
  try {
    const { userImageUrl, outfitImageUrl, userId } = req.body;

    if (!userImageUrl || !outfitImageUrl) {
      return res.status(400).json({ message: 'Both user and outfit images are required' });
    }

    const validUserId = userId || "000000000000000000000000"; 
    
    // Generate Fashion Intelligence Data deterministically
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
      generatedImageUrl: outfitImageUrl, // Fallback to outfit image for the preview
      outfitAnalysisId: analysis._id
    });

    res.status(200).json({
      success: true,
      analysis: analysis.analysis,
      originalUserImageUrl: userImageUrl,
      outfitImageUrl: outfitImageUrl,
      generatedImageUrl: generated.generatedImageUrl, // The AI Style Preview
      analysisId: analysis._id
    });

  } catch (error) {
    console.error('Try-On Orchestration Error:', error.message);
    res.status(503).json({ message: error.message || 'AI Generation Service is currently unavailable. Please try again.' });
  }
};

module.exports = { generateTryOn };
