const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 

router.get('/products/search', async (req, res) => {
    try {
         // Get the search query from the request
        const query = req.query.query || '';
        // Create a case-insensitive regex
        const regex = new RegExp(query, 'i'); 

        // Find products where the title or tags match the search query
        const products = await Product.find({
            $or: [
                { title: { $regex: regex } },
                { tags: { $regex: regex } }
            ]
        });

         // Render the EJS template
        res.render('partical/findProduct', { products, query });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
