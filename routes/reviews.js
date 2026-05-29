const express = require('express');
const router = express.Router({ mergeParams: true });

const wrapAsync = require('../utils/wrapAsync');
const { validateReview, isLoggedIn, isReviewOwner } = require('../middleware');
const reviewController = require('../controllers/review');

router.post('/', isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewOwner, wrapAsync(reviewController.deleteReview));

module.exports = router;
