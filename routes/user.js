const express = require('express');
const router = express.Router();

const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');

const userController = require('../controllers/user');

// ===============================
// SIGNUP
// ===============================

// Signup Form
router.get('/signup', userController.renderSignupForm);

// Signup Logic
router.post('/signup', wrapAsync(userController.signup));

// ===============================
// LOGIN
// ===============================

// Login Form
router.get('/login', userController.renderLoginForm);

// Login Logic
router.post(
  '/login',
  saveRedirectUrl,
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  userController.login
);

// ===============================
// LOGOUT
// ===============================
router.get('/logout', userController.logout);

module.exports = router;
