const express = require('express');
const upload = require('../config/multer');
const Products = require('../models/Product');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// upload product router
router.post('/upload-new', upload.single('image'), async (req, res) => {
    try {
        const { title, price, description, inStock } = req.body;

        // Validate required fields
        if (!title || !price || !inStock || !req.file) {
            return res.status(400).json({ message: 'All fields are required, including the image.' });
        }

        // Normalize the file path
        const imagePath = `uploads/${req.file.filename}`;

        // Create a new product
        const product = new Products({
            image: imagePath,
            title,
            price,
            description,
            inStock,
        });

        // Save product to database
        const savedProduct = await product.save();

        // Send success response
        res.status(201).json({
            message: 'Product saved successfully.',
            product: savedProduct,
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error uploading product.' });
    }
});




router.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product by ID
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Remove the product's image from the filesystem
        if (product.image) {
            const imagePath = path.join(__dirname, '..', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete the product from the database
        await Products.findByIdAndDelete(id);

        // Redirect or send success response
        res.redirect('/admin/dashboard'); // Or any other route you prefer
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error deleting product');
    }
});


module.exports = router;
