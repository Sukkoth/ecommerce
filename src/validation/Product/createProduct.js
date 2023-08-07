const Joi = require('joi');

const attributeValidationSchema = Joi.object({
    name: Joi.string().required().max(100),
    value: Joi.string().required().max(100),
});

const variationValidationSchema = Joi.object({
    attributes: Joi.array().items(attributeValidationSchema).required(),
    price: Joi.number().required().min(0),
    images: Joi.array().items(Joi.string().max(200)), // Array of image URLs
    stockQuantity: Joi.number().required().min(0),
});

const productValidationSchema = Joi.object({
    name: Joi.string().required().max(100),
    description: Joi.string().required().max(500),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
    imageUrl: Joi.string().default('default_product_image.jpg'),
    isActive: Joi.boolean().default(true),
    variations: Joi.array().items(variationValidationSchema),
});

module.exports = { productValidationSchema, variationValidationSchema };
