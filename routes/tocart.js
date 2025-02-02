const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/product');
const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

// Add to Cart
router.post('/add-to-cart', isAuthenticated, async (req, res) => {
    const { productId } = req.body;
    // Use authenticated user's ID
    const userId = req.user._id; 

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
             // Increment quantity if item already exists
            existingItem.quantity += 1;
        } else {
            // Add new item to cart
            cart.items.push({ productId, quantity: 1 }); 
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (err) {
        console.error('Error in /add-to-cart route:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// View Cart
router.get('/view-cart', isAuthenticated, async (req, res) => {
    const userId = req.user._id; // Use authenticated user's ID

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is empty', cart: [] });
        }

        // Calculate total price
        const total = cart.items.reduce((sum, item) => sum + (item.productId.price * item.quantity), 0);
        res.status(200).json({ cart: cart.items, total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove from Cart
router.delete('/remove-from-cart/:productId', isAuthenticated, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id; 

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updatedItems = cart.items.filter(item => item.productId.toString() !== productId);

        if (cart.items.length === updatedItems.length) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items = updatedItems;
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;