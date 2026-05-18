const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');
const { upload } = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), uploadImage);

module.exports = router;
