const User = require('../models/user');

// ===============================
// Render Signup Form
// ===============================
module.exports.renderSignupForm = (req, res) => {
  res.render('users/signup');
};

// ===============================
// Signup Logic
// ===============================
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      req.flash('error', 'All fields are required!');
      return res.redirect('/signup');
    }

    const newUser = new User({ email, username });

    // Register user (passport-local-mongoose)
    const registeredUser = await User.register(newUser, password);

    // Auto login after signup
    req.login(registeredUser, err => {
      if (err) return next(err);

      req.flash('success', 'Welcome to StayNest!');
      res.redirect('/listings');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/signup');
  }
};

// ===============================
// Render Login Form
// ===============================
module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

// ===============================
// Login Success Handler
// ===============================
module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back!');

  const redirectUrl = res.locals.redirectUrl || '/listings';
  res.redirect(redirectUrl);
};

// ===============================
// Logout
// ===============================
module.exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.flash('success', 'Logged out successfully!');
    res.redirect('/listings');
  });
};
