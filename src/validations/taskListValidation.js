const Joi = require('joi');
const { objectId } = require('./customValidation');

const createTaskList = {
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    name: Joi.string().required()
  })
};

const getTaskList = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

const getTaskListsbyUserId = {
  params: Joi.object().keys({
    user_id: Joi.string().custom(objectId)
  })
};

const updateTaskList = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId)
  }),
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    name: Joi.string().required()
  })
};

const deleteTaskList = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  })
};

module.exports = {
  createTaskList,
  getTaskList,
  getTaskListsbyUserId,
  updateTaskList,
  deleteTaskList
};
