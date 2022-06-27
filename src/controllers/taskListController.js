const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { TaskList } = require('../models');

const createTaskList = catchAsync(async (req, res) => {
  const taskListBody = req.body;
  const taskList = await TaskList.create(taskListBody);
  res.status(httpStatus.CREATED).send(taskList);
});

const getTaskList = catchAsync(async (req, res) => {
  const taskList = await TaskList.findById(req.params.id);
  if (!taskList) throw new ApiError(httpStatus.NOT_FOUND, 'task list not found');
  res.send(taskList);
});

const getTaskListsbyUserId = catchAsync(async (req, res) => {
  const taskLists = await TaskList.find({ user_id: req.params.user_id });
  if (!taskLists) throw new ApiError(httpStatus.NOT_FOUND, 'task lists not found');
  res.send(taskLists);
});

const updateTaskList = catchAsync(async (req, res) => {
  const taskList = await TaskList.findById(req.params.id);
  if (!taskList) throw new ApiError(httpStatus.NOT_FOUND, 'task list not found');
  await Object.assign(taskList, req.body);
  await taskList.save();

  if (!taskList) throw new ApiError(httpStatus.NOT_FOUND, 'task list not found');
  res.send(taskList);
});

const deleteTaskList = catchAsync(async (req, res) => {
  const taskList = await TaskList.findById(req.params.id);
  if (!taskList) throw new ApiError(httpStatus.NOT_FOUND, 'task list not found');
  taskList.remove();
  res.send({ deleted: true });
});

module.exports = {
  createTaskList,
  getTaskList,
  getTaskListsbyUserId,
  updateTaskList,
  deleteTaskList
};
