const express = require('express');
const SetupLandingPage = require('../models/setupLandingPage');
const upload = require('../config/multer');

const router = express.Router();

// Route to setup landing page
router.post('/setupLandingPage', upload.single('landingPageBenner'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        const landingPage = new SetupLandingPage({
            landingPageBanner: req.file.path, // Store the file path or URL
        });

        const savedLandingPage = await landingPage.save();

        res.status(201).json({
            message: 'Landing page saved successfully.',
            landingPage: savedLandingPage,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Error uploading landing page.' });
    }
});

module.exports = router;
