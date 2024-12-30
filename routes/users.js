const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

router.get('/profile', isAuthenticated, (req, res) => {
  res.render('auth/profile', { user: req.user });
});

module.exports = router;
