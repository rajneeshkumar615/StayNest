const Joi = require('joi');

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().allow('', null),
    category: Joi.string().allow('', null),
    latitude: Joi.number().allow(null),
    longitude: Joi.number().allow(null),
  }).required(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().allow('', null),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
