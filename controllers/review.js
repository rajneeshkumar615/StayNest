const Listing = require('../models/listing');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');

module.exports.createReview = async (req, res, next) => {
  // ✅ added next
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    return next(new ExpressError(404, 'Listing Not Found')); // ✅ use next() instead of throw
  }

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id; // Set the author of the review
  await newReview.save(); // Save the review first

  listing.reviews.push(newReview._id); // Add review reference to listing **only once**
  await listing.save();

  req.flash('success', 'New Review Created Successfully!');
  res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res, next) => {
  // ✅ added next
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  req.flash('success', 'Review Deleted Successfully!');
  res.redirect(`/listings/${id}`);
};
