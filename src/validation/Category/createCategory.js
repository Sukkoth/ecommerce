const Joi = require('joi');
const categoryValidationSchema = Joi.object({
    name: Joi.string().required().max(50),
    description: Joi.string().required().max(200),
    imageUrl: Joi.string().max(100),
});

module.exports = categoryValidationSchema;
