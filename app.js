// Description: Main entry point for the application.
// It contains the server configuration and routes.

// Required Libraries and Dependencies
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');


// models
const User = require('./models/User');
const Product = require('./models/Product');
const LandingPage = require('./models/setupLandingPage');
const Orders = require('./models/order');

// Express App
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
require('./config/db');
// Passport Configuration
require('./config/passport');



// Routes
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/api/up-product', require('./routes/products'));
app.use('/api/landingPageSetup', require('./routes/setupLandingPage'));
app.use(require('./routes/searchProduct'));
app.use(require('./routes/order'));


// Admin Dashboard
app.get('/admin/dashboard', async (req, res) => {
  try {
    // fetch all data
    const users = await User.find({}, 'username email createdAt');
    const products = await Product.find({}, 'image title price description inStock createdAt tags');
    const benner = await LandingPage.find({}, 'landingPageBanner');
    const orders = await Orders.find({}, 'product userName userEmail productImg productTitle productPrice deliveryLocation paymentMethod status createdAt mobileNumber')
    // take new orders first
      .populate('product')
      .populate('user')
      .sort({ createdAt: -1 });
    // send it to the admin dashboard
    res.render('admin/admin', { users, products, benner, orders });
  } catch (error) {
    console.error('Admin Dashboard Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
