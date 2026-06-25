const Review = require("./models/review");
const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");

// ===============================
// LOGIN CHECK
// ===============================
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
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
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

// ===============================
// VALIDATE REVIEW
// ===============================
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(400, msg);
  }
  next();
};

// ===============================
// CHECK LISTING OWNER
// ===============================
module.exports.isOwner = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (!req.user || !listing.owner.equals(req.user._id)) {
    req.flash("error", "Not allowed");
    return res.redirect(`/listings/${req.params.id}`);
  }

  next();
};

// ===============================
// CHECK REVIEW OWNER
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