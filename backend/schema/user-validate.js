const Joi = require("joi");
// register
const userValidate = (body) => {
  // schema
  const schema = Joi.object({
    username: Joi.string().alphanum().trim().min(3).max(40).required(),
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().min(6).trim().required(),
  });
  const { error, value, warning } = schema.validate(body);

  return { error, value, warning };
};

// login
const userRegisterValidate = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().min(6).trim().required(),
  });

  const { error, value } = schema.validate(body);

  return { error, value };
};

module.exports = { userValidate, userRegisterValidate };
