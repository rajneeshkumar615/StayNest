if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ quiet: true });
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const ExpressError = require('./utils/ExpressError');

const listings = require('./routes/listing');
const reviews = require('./routes/reviews');
const user = require('./routes/user');

const session = require('express-session');
const flash = require('connect-flash');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const port = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_URI;

if (!mongo_url) {
  throw new Error('MONGO_URI is missing. Check your .env file');
}

// ===============================
// Database Connection
// ===============================
mongoose
  .connect(mongo_url)
  .then(() => console.log('Connected to StayNest database'))
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

// ===============================
// App Configuration
// ===============================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
// Session Options
// ===============================
const sessionOptions = {
  secret: process.env.SECRET || 'devsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

// ===============================
// Session & Flash
// ===============================
app.use(session(sessionOptions));
app.use(flash());

// ===============================
// Passport
// ===============================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============================
// Locals Middleware
// ===============================
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.curr = req.user;
  res.locals.currUser = req.user;
  next();
});

// ===============================
// Routes
// ===============================
app.get('/', (req, res) => {
  res.redirect('/listings');
});

app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);
app.use('/', user);

// ===============================
// 404 Handler
// ===============================
app.use((req, res, next) => {
  next(new ExpressError(404, 'Page Not Found'));
});

// ===============================
// Error Handler
// ===============================
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);

  let { statusCode = 500, message = 'Something Went Wrong' } = err;

  if (err.message && err.message.includes('file format')) {
    statusCode = 400;
    message = 'Image format not supported. Please use JPG, PNG, GIF, or WEBP formats.';
  }

  if (err.http_code === 400 && err.message) {
    statusCode = 400;
    message = err.message || 'Image upload failed. Please check the file format and try again.';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message =
      'Validation Error: ' +
      Object.values(err.errors)
        .map(e => e.message)
        .join(', ');
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  res.status(statusCode).render('error', { message, err });
});

// ===============================
// Start Server
// ===============================
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}

module.exports = app;