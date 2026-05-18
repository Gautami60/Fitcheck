const express = require('express');
const router = express.Router();
const { getUserProfile, updatePreferences } = require('../controllers/userController');

router.get('/profile', getUserProfile);
router.put('/preferences', updatePreferences);

module.exports = router;
