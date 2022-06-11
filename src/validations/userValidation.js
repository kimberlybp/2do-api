const Joi = require('joi');
const { objectId } = require('./customValidation');

const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    profile_pic_url: Joi.string(),
    sub: Joi.string().required()
  })
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      first_name: Joi.string(),
      last_name: Joi.string(),
      email: Joi.string().email(),
      profile_pic_url: Joi.string(),
    })
    .min(1),
};

const checkEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email()
  })
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  checkEmail
};
