const mongoose = require('mongoose');
require('dotenv').config();

const local = 'mongodb://localhost:27017/sneakernest'

const db = mongoose.connect(process.env.MONGO_URI || local, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Database connection error:', err));

module.exports = db;