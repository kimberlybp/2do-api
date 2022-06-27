const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { Tag, Task } = require('../models');

const createTag = catchAsync(async (req, res) => {
  const tagBody = req.body;
  const tag = await Tag.create(tagBody);
  res.status(httpStatus.CREATED).send(tag);
});

const getTag = catchAsync(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  res.send(tag);
});

const getTagsbyUserId = catchAsync(async (req, res) => {
  const tags = await Tag.find({ user_id: req.params.user_id });
  res.send(tags);
});

const updateTag = catchAsync(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag) throw new ApiError(httpStatus.NOT_FOUND, 'tag not found');
  await Object.assign(tag, req.body);
  await tag.save();

  if (!tag) throw new ApiError(httpStatus.NOT_FOUND, 'tag not found');
  res.send(tag);
});

const deleteTag = catchAsync(async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  if (!tag) throw new ApiError(httpStatus.NOT_FOUND, 'tag not found');
  Task.updateMany({}, { $pull: { tags: tag._id } });
  tag.remove();
  res.send({ deleted: true });
});

module.exports = {
  createTag,
  getTag,
  getTagsbyUserId,
  updateTag,
  deleteTag
};
