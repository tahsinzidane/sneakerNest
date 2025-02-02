const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Register
router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', async (req, res) => {
  const { username, email, password, createdAt } = req.body;
  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      req.flash('error', 'Username already taken');
      return res.redirect('/auth/register');
    }

    const newUser = new User({ username, email, password, createdAt });
    await newUser.save();
    req.flash('success', 'Registration successful! You can log in now.');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', 'Something went wrong');
    res.redirect('/auth/register');
  }
});

// Login
router.get('/login', (req, res) => res.render('auth/login', { message: req.flash('error') }));
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  failureFlash: true,
}), (req, res) => {
  req.session.userId = req.user._id;  // ✅ Store userId in session
  req.session.save(() => res.redirect('/users/profile'));
});


// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'You have logged out');
    res.redirect('/');
  });
});



module.exports = router;
