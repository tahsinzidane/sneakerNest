const express = require('express');
const router = express.Router();
const Benner = require('../models/setupLandingPage');
const Product = require('../models/Product');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const benner = await Benner.find({}, 'landingPageBanner');
    const products = await Product.find({}, 'image title price description inStock createdAt');
    res.render('index', {
      user: req.user,
      benner,
      products,
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Internal Server Error');
  }

});

// res.render('index', { user: req.user });
module.exports = router;
