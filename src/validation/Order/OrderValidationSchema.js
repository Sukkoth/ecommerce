const Joi = require('joi');

const shipmentAddressSchema = Joi.object({
  country: Joi.string().required(),
  city: Joi.string().required(),
  subCity: Joi.string().required(),
});

const itemSchema = Joi.object({
  product: Joi.string().required(),
  variationIndex: Joi.number().required(),
  quantity: Joi.number().required(),
  _id: Joi.string().required(),
});

const orderValidationSchema = Joi.object({
  shipmentAddress: shipmentAddressSchema.required(),
  items: Joi.array().items(itemSchema).required(),
  shipmentPrice: Joi.number().required(),
  grandTotal: Joi.number().required(),
  paymentMethod: Joi.string().required()
});

module.exports = orderValidationSchema;
