const Listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');
const mongoose = require('mongoose');

module.exports.index = async (req, res) => {
  let filter = {};

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filter.$or = [
      { title: searchRegex },
      { location: searchRegex },
      { country: searchRegex },
      { description: searchRegex },
    ];
  }

  if (req.query.category && req.query.category !== 'all') {
    filter.category = req.query.category;
  }

  const listings = await Listing.find(filter);

  res.render('listings/index', {
    listings,
    searchQuery: req.query.search || '',
    selectedCategory: req.query.category || 'all',
  });
};

module.exports.renderNewForm = (req, res) => {
  res.render('listings/new');
};

module.exports.showListing = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, 'Invalid Listing ID');
  }

  const listing = await Listing.findById(id)
    .populate({
      path: 'reviews',
      populate: { path: 'author' },
    })
    .populate('owner');

  if (!listing) {
    req.flash('error', 'Listing Not Found!');
    return res.redirect('/listings');
  }

  res.render('listings/show', { listing });
};

module.exports.createListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, 'Invalid listing data');
  }

  if (!req.file) {
    throw new ExpressError(400, 'Please upload an image');
  }

  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;
  // Support both Cloudinary (req.file.path is a remote URL) and local disk storage
  const imageUrl = req.file.path && String(req.file.path).startsWith('http')
    ? req.file.path
    : `/uploads/${req.file.filename}`;

  newListing.image = {
    url: imageUrl,
    filename: req.file.filename,
  };

  await newListing.save();

  req.flash('success', 'Listing Created Successfully!');
  res.redirect('/listings');
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash('error', 'Listing Not Found!');
    return res.redirect('/listings');
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace('/upload', '/upload/h_300,w_250');

  res.render('listings/edit', { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });

  if (!listing) {
    throw new ExpressError(404, 'Listing Not Found');
  }

  if (req.file) {
    const imageUrl = req.file.path && String(req.file.path).startsWith('http')
      ? req.file.path
      : `/uploads/${req.file.filename}`;

    listing.image = {
      url: imageUrl,
      filename: req.file.filename,
    };

    await listing.save();
  }

  req.flash('success', 'Listing Updated Successfully!');
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash('success', 'Listing Deleted Successfully!');
  res.redirect('/listings');
};
