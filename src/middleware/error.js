require('colors');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { httpStatus } = require('../utils/constants');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || statusCode === httpStatus.BAD_REQUEST ? 'bad request' : 'internal server error';
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = 'internal server error';
    console.log(err);
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('Error: ' + err + ''.red);
  }

  console.log(response);

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler
};
