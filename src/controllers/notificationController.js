const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { Notification } = require('../models');

const createNotification = catchAsync(async (req, res) => {
  const notificationBody = req.body;
  notificationBody.date_notified = new Date();
  const notification = await Notification.create(notificationBody);
  res.status(httpStatus.CREATED).send(notification);
});

const getNotification = catchAsync(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) throw new ApiError(httpStatus.NOT_FOUND, 'notication not found');
  res.send(notification);
});

const getNotificationsbyUserId = catchAsync(async (req, res) => {
  const notifications = await Notification.find({ user_id: req.params.user_id });
  if (!notifications) throw new ApiError(httpStatus.NOT_FOUND, 'notications not found');
  res.send(notifications);
});

const deleteNotification = catchAsync(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) throw new ApiError(httpStatus.NOT_FOUND, 'notication not found');
  notification.remove();
  res.send({ deleted: true });
});

module.exports = {
  createNotification,
  getNotification,
  getNotificationsbyUserId,
  deleteNotification
};
