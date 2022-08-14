const Joi = require('joi');

const createTask = {
  body: Joi.object().keys({
    sub: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    profile_pic_url: Joi.string().allow(null, '')
  })
};

module.exports = {
  createTask
};
