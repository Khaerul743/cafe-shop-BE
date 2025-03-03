const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be long 6 character",
    "any.required": "Password is required",
  }),
});

module.exports = { registerSchema };
