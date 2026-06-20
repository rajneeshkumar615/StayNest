const express = require('express');
const router = express.Router();

const wrapAsync = require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validateListing } = require('../middlewareHandler');
const listingControllers = require('../controllers/listing');

const multer = require('multer');
const { storage } = require('../cloudConfig');
const upload = multer({ storage });

// (debug logs removed)

router
  .route('/')
  .get(wrapAsync(listingControllers.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingControllers.createListing)
  );

router.get('/new', isLoggedIn, listingControllers.renderNewForm);

router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingControllers.editListing));

router
  .route('/:id')
  .get(wrapAsync(listingControllers.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingControllers.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.deleteListing));

module.exports = router;
