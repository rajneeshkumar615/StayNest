const mongoose = require('mongoose');
const review = require('./review');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  // ✅ Image is STRING
  image: {
    filename: String,
    url: String,
  },

  price: Number,
  location: String,
  country: String,
  category: {
    type: String,
    enum: [
      'Trending',
      'Rooms',
      'Iconic Cities',
      'Mountains',
      'Castles',
      'Amazing pools',
      'Camping',
      'Farms',
      'Doms',
    ],
    default: 'Trending',
  },
  latitude: Number,
  longitude: Number,

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

listingSchema.post('findOneAndDelete', async listing => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model('Listing', listingSchema);
