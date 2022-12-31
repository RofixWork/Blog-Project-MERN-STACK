const Joi = require("joi");

const postUpdatedValidate = (body) => {
  const schema = Joi.object({
    title: Joi.string().trim().lowercase().required(),
    body: Joi.string().trim().required(),
    desc: Joi.string().trim().max(150).required(),
  });
  const { error, value } = schema.validate(body);

  return { error, value };
};

module.exports = postUpdatedValidate;
