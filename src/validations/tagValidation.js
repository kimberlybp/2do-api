const Joi = require('joi');
const { objectId } = require('./customValidation');

const createTag = {
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    name: Joi.string().required(),
    colour: Joi.string().required()
  })
};

const getTag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

const getTagsbyUserId = {
  params: Joi.object().keys({
    user_id: Joi.string().custom(objectId)
  })
};

const updateTag = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    name: Joi.string().required(),
    colour: Joi.string().required()
  })
};

const deleteTag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

module.exports = {
  createTag,
  getTag,
  getTagsbyUserId,
  updateTag,
  deleteTag
};
