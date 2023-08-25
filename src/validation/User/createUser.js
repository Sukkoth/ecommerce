const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  isAdmin: Joi.boolean(),
  avatarUrl: Joi.string(),
});

module.exports = userValidationSchema;
