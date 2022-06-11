const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    profile_pic_url: Joi.string(),
    sub: Joi.string().required()
  }),
};

module.exports = {
  createUser,
};
