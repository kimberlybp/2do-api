const { string } = require('joi');
const Joi = require('joi');
const { objectId } = require('./customValidation');

const createTask = {
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    task_list: Joi.string().custom(objectId),
    title: Joi.string().required(),
    description: Joi.string().allow(null, ''),
    subtasks: Joi.array().items({
      order: Joi.number().required(),
      title: Joi.string().required(),
      complete: Joi.string().required()
    }).allow(null, ''),
    tags: Joi.array().items({
      tag_id: Joi.string().custom(objectId)
    }).allow(null, ''),
    due_date: Joi.string().allow(null, ''),
    module: Joi.object({
      module_code: Joi.string().required(),
      title: Joi.string().required(),
      department: Joi.string().required(),
      faculty: Joi.string().required()
    }).allow(null, '')
  })
};

const getAllUserTasks = {
  params: Joi.object().keys({
    user_id: Joi.string().custom(objectId)
  })
};

const updateTask = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId)
  }),
  body: Joi.object().keys({
    user_id: Joi.string().custom(objectId),
    task_list: Joi.string().custom(objectId),
    title: Joi.string().required(),
    description: Joi.string().allow(null, ''),
    subtasks: Joi.array().items({
      order: Joi.number().required(),
      title: Joi.string().required(),
      complete: Joi.string().required()
    }).allow(null, ''),
    tags: Joi.array().items({
      tag_id: Joi.string().custom(objectId)
    }).allow(null, ''),
    due_date: Joi.string().allow(null, ''),
    module: Joi.object({
      module_code: Joi.string().required(),
      title: Joi.string().required(),
      department: Joi.string().required(),
      faculty: Joi.string().required()
    }).allow(null, '')
  })
    .min(2)
};

module.exports = {
  createTask,
  getAllUserTasks,
  updateTask
};
