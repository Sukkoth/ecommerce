const Joi = require('joi');

const cartItemValidationSchema = Joi.object({
  productId: Joi.string().required(), // Assuming product ID is a string
  variationIndex: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const cartValidationSchema = Joi.object({
  userId: Joi.string().required(), // Assuming user ID is a string
  items: Joi.array().items(cartItemValidationSchema).min(1).required(),
});

module.exports = {
  cartItemValidationSchema,
  cartValidationSchema,
};
