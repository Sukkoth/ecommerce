const Joi = require('joi');
const categoryValidationSchema = Joi.object({
    name: Joi.string().max(50),
    description: Joi.string().max(200),
    imageUrl: Joi.string().max(100),
    isActive: Joi.boolean(),
});

module.exports = categoryValidationSchema;
