const mongoose = require('mongoose');
require('dotenv').config();

const db = mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Database connection error:', err));

module.exports = db;