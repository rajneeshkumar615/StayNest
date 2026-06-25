const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/index", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid Listing ID");
  }

  const listing = await Listing.findById(id)
    .populate("reviews")
    .populate("owner");

  if (!listing) {
    return res.redirect("/listings");
  }

  res.render("listings/show", { listing });
};

module.exports.createListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Invalid listing data");
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    const imageUrl =
      req.file.path && req.file.path.startsWith("http")
        ? req.file.path
        : `/uploads/${req.file.filename}`;

    newListing.image = {
      url: imageUrl,
      filename: req.file.filename,
    };
  }

  await newListing.save();

  req.flash("success", "Listing created!");
  res.redirect("/listings");
};

// 🔥 FIXED EDIT (SAFE)
module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  res.render("listings/edit", { listing });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    req.body.listing,
    { new: true, runValidators: true }
  );

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (req.file) {
    const imageUrl =
      req.file.path && req.file.path.startsWith("http")
        ? req.file.path
        : `/uploads/${req.file.filename}`;

    listing.image = {
      url: imageUrl,
      filename: req.file.filename,
    };

    await listing.save();
  }

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};