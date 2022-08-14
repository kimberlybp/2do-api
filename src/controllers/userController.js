const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { User } = require('../models');

const createUser = catchAsync(async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) throw new ApiError(httpStatus.BAD_REQUEST, 'email already taken');
  const userBody = req.body;
  userBody.created_at = new Date();
  userBody.updated_at = new Date();

  const user = await User.create(userBody);
  res.status(httpStatus.CREATED).send(user);
});

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  res.send(user);
});

const getUserBySub = catchAsync(async (req, res) => {
  const user = await User.findOne({ sub: req.params.sub });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  if (req.body.email && (await User.isEmailTaken(req.body.email, req.params.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'email already taken');
  }
  await Object.assign(user, req.body);
  user.updated_at = new Date();
  await user.save();

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  res.send(user);
});

const checkEmail = catchAsync(async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) res.send({ isValid: false });
  res.send({ isValid: true });
});

module.exports = {
  createUser,
  checkEmail,
  getUser,
  getUserBySub,
  updateUser
};
