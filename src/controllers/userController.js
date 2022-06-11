const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { User } = require('../models');

const createUser = catchAsync(async (req, res) => {
  if (await User.isEmailTaken(req.body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  let userBody = req.body;
  userBody.created_at = new Date();
  userBody.updated_at = new Date();

  const user = await User.create(userBody);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  createUser
}
