const UserPreferences = require('../models/UserPreferences');
const User = require('../models/User');

// @desc    Get user profile & preferences
// @route   GET /api/user/profile
// @access  Public (mocked)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'User ID required' });

    const user = await User.findById(userId).select('-password');
    const preferences = await UserPreferences.findOne({ userId });

    res.status(200).json({ user, preferences });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user preferences
// @route   PUT /api/user/preferences
// @access  Public (mocked)
const updatePreferences = async (req, res) => {
  try {
    const { userId, bodyType, skinTone, preferredStyle, comfortLevel, favoriteColors } = req.body;
    
    if (!userId) return res.status(400).json({ message: 'User ID required' });

    let prefs = await UserPreferences.findOne({ userId });
    
    if (prefs) {
      prefs.bodyType = bodyType || prefs.bodyType;
      prefs.skinTone = skinTone || prefs.skinTone;
      prefs.preferredStyle = preferredStyle || prefs.preferredStyle;
      prefs.comfortLevel = comfortLevel || prefs.comfortLevel;
      prefs.favoriteColors = favoriteColors || prefs.favoriteColors;
      await prefs.save();
    } else {
      prefs = await UserPreferences.create({
        userId, bodyType, skinTone, preferredStyle, comfortLevel, favoriteColors
      });
    }

    res.status(200).json(prefs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updatePreferences };
