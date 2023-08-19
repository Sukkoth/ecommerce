const Joi = require('joi');

const cartItemValidationSchema = Joi.object({
  product: Joi.string().required(), // Assuming product ID is a string
  variationIndex: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const cartValidationSchema = Joi.object({
  user: Joi.string().required(), // Assuming user ID is a string
  items: Joi.array().items(cartItemValidationSchema).min(1).required(),
});

module.exports = {
  cartItemValidationSchema,
  cartValidationSchema,
};
