// product order model

const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        // product model reference
        ref: 'Product', 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // user model reference
        ref: 'User', 
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    productImg: {
        type: String,  
        required: true
    },
    productTitle: {
        type: String,  
        required: true
    },
    productPrice: {
        type: Number,  
        required: true
    },
    deliveryLocation: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    mobileNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);
