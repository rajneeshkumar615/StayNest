const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");

// ===============================
// LOGIN CHECK
// ===============================
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

// ===============================
// SAVE REDIRECT URL
// ===============================
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session && req.session.returnTo) {
    res.locals.redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
  }
  next();
};

// ===============================
// VALIDATE LISTING
// ===============================
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  next();
};

// ===============================
// VALIDATE REVIEW  ⭐ FIXED SAFE VERSION
// ===============================
module.exports.validateReview = (req, res, next) => {
  if (!req.body) {
    return next(new ExpressError(400, "Missing request body"));
  }

  const { error } = reviewSchema.validate(req.body);

  if (error) {
    throw new ExpressError(400, error.details[0].message);
  }

  next();
};

// ===============================
// LISTING OWNER CHECK
// ===============================
module.exports.isOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (!req.user || !listing.owner.equals(req.user._id)) {
    req.flash("error", "Not authorized");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};

// ===============================
// REVIEW OWNER CHECK
// ===============================
module.exports.isReviewOwner = async (req, res, next) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) {
    req.flash("error", "Review not found");
    return res.redirect("back");
  }

  if (!req.user || !review.author.equals(req.user._id)) {
    req.flash("error", "Not allowed");
    return res.redirect("back");
  }

  next();
};