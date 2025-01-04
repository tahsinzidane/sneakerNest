const express = require('express');
const SetupLandingPage = require('../models/setupLandingPage');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Route to setup landing page
router.post('/setupLandingPage', upload.single('landingPageBenner'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        const landingPage = new SetupLandingPage({
            landingPageBanner: `uploads/${req.file.filename}`,
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



// Delete a landing page banner
router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the banner by ID
        const banner = await SetupLandingPage.findById(id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found.' });
        }

        // Remove the image file from the filesystem
        const imagePath = path.join(__dirname, '..', banner.landingPageBanner);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Remove the banner from the database
        await SetupLandingPage.findByIdAndDelete(id);

        res.status(200).json({ message: 'Banner deleted successfully.' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ message: 'Error deleting banner.' });
    }
});

module.exports = router;
