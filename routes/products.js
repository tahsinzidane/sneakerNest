const express = require('express');
const upload = require('../config/multer');
const Products = require('../models/Product');

const router = express.Router();

router.post('/upload-new', upload.single('image'), async (req, res) => {
    try {
        // console.log('Body:', req.body);
        // console.log('File:', req.file);

        const { title, price, description, inStock } = req.body;

        // Validate required fields
        if (!title || !price || !inStock || !req.file) {
            return res.status(400).json({ message: 'All fields are required, including the image.' });
        }

        // Create a new product
        const product = new Products({
            image: req.file.path,
            title,
            price,
            description,
            inStock
        });


        // Save product to database
        const savedProduct = await product.save();

        // Send success response
        res.status(201).json({
            message: 'Product saved successfully.',
            product: savedProduct
        });
    } catch (error) {
        // console.error('Error:', error);
        res.status(500).json({ message: 'Error uploading product.' });
    }
});

module.exports = router;
