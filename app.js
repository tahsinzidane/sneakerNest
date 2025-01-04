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

// Express App
const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Database connection error:', err));

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

// Passport Configuration
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'No user found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Routes
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/api/up-product', require('./routes/products'));
app.use('/api/landingPageSetup', require('./routes/setupLandingPage'));

// Admin Dashboard
app.get('/admin/dashboard', async (req, res) => {
  try {
    // Fetch users and products
    const users = await User.find({}, 'username email createdAt');
    const products = await Product.find({}, 'image title price description inStock createdAt');
    const benner = await LandingPage.find({}, 'landingPageBanner');
    res.render('admin/admin', { users, products, benner });
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
