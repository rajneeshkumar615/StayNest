const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner } = require("../middlewareHandler");
const listingController = require("../controllers/listing");

const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// CREATE + INDEX
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );

// NEW FORM
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW / UPDATE / DELETE
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;
