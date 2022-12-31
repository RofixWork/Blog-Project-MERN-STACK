const Joi = require("joi");

const commentValidate = (body) => {
  const schema = Joi.object({
    comment: Joi.string().trim().required(),
    username: Joi.string().trim().required(),
    postId: Joi.string().trim().required(),
    userId: Joi.string().trim().required(),
  });

  const { value, error } = schema.validate(body);

  return { error, value };
};
module.exports = commentValidate;
