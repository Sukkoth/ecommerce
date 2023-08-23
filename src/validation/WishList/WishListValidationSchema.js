const Joi = require('joi');

const wishListItemValidationSchema = Joi.object({
  product: Joi.string().required(),
  variationIndex: Joi.number().required(),
});

const wishListValidationSchema = Joi.object({
  user: Joi.string().required(),
  items: Joi.array().items(wishListItemValidationSchema),
});

module.exports = { wishListValidationSchema, wishListItemValidationSchema };
