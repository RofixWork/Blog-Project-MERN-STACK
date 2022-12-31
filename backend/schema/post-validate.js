const Joi = require("joi");

const postValidate = (body) => {
  const schema = Joi.object({
    title: Joi.string().trim().lowercase().required(),
    body: Joi.string().required(),
    description: Joi.string().min(10).max(150).lowercase().required(),
    slug: Joi.string().trim().lowercase().required(),
    username: Joi.string().required(),
    id: Joi.string().required(),
  });

  const { error, value, warning } = schema.validate(body);

  return { error, value, warning };
};
module.exports = postValidate;
