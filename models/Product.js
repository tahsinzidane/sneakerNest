const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 1
    },
    description: {
        type: String
    },
    inStock: {
        type: Number,
        required: true,
        default: 1
    },
    tags:{
        type: [String],
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema);