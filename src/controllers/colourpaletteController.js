const catchAsync = require('../utils/asyncCatch');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const { ColourPalette } = require('../models');

const getColourPalettes = catchAsync(async (req, res) => {
  const colourPalettes = await ColourPalette.find({});
  if (!colourPalettes) throw new ApiError(httpStatus.NOT_FOUND, 'colour palettes not found');
  res.send(colourPalettes);
});

module.exports = {
  getColourPalettes
};
