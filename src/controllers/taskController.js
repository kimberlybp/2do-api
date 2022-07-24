const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { Task } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId; 

const createTask = catchAsync(async (req, res) => {
  const taskBody = req.body;
  taskBody.created_at = new Date();
  taskBody.updated_at = new Date();
  taskBody.complete = false;

  const task = await Task.create(taskBody);
  res.status(httpStatus.CREATED).send(task);
});

const getAllUserTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user_id: ObjectId(req.params.user_id) }).populate('tags task_list');
  res.send(tasks);
});

const updateTask = catchAsync(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'task not found');
  await Object.assign(task, req.body);
  task.updated_at = new Date();
  await task.save();

  if (!task) throw new ApiError(httpStatus.NOT_FOUND, 'task not found');
  res.send(task);
})

module.exports = {
  createTask,
  getAllUserTasks,
  updateTask
};
