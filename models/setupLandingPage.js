const mongoose = require('mongoose');

const setupLandingPageSchema = new mongoose.Schema({
    landingPageBanner: {
        type: String,
        required: true, 
    },
}, { timestamps: true });

module.exports = mongoose.model('SetupLandingPage', setupLandingPageSchema);
