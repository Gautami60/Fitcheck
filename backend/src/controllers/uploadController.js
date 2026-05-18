// @desc    Upload an image
// @route   POST /api/upload
// @access  Private (mocked public for now)
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return Cloudinary URL
    res.status(200).json({ 
      url: req.file.path,
      public_id: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadImage };
