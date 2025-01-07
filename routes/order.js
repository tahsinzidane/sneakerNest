const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/order');

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/auth/login');
}

// Route for viewing product details
router.get('/product/:id', isAuthenticated, async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found.');
        }
        res.render('partical/order', { product });  
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

// Route for placing an order
router.post('/order', async (req, res) => {
    const { productId, productImg, deliveryLocation, paymentMethod, mobileNumber, productTitle, productPrice } = req.body;

    if (!req.user) {
        return res.status(401).send('Please log in to place an order.');
    }

    try {
        const order = new Order({
            // all order data
            product: productId,
            productImg: productImg,
            user: req.user._id, 
            userName: req.user.username,
            userEmail: req.user.email,
            productPrice: productPrice,
            productTitle: productTitle, 
            deliveryLocation: deliveryLocation,
            paymentMethod: paymentMethod,
            status: 'Pending',
            mobileNumber: mobileNumber
        });

        await order.save();
        res.send('Order placed successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to place order.');
    }
});


module.exports = router;
