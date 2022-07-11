const Joi = require('joi');
const { objectId } = require('./customValidation');

const createNotification = {
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    title: Joi.string().required(),
    description: Joi.string().required(),
    task_id: Joi.string().allow(null, '')
  })
};

const getNotification = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

const getNotificationsbyUserId = {
  params: Joi.object().keys({
    user_id: Joi.string().custom(objectId)
  })
};

const deleteNotification = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

module.exports = {
  createNotification,
  getNotification,
  getNotificationsbyUserId,
  deleteNotification
};
