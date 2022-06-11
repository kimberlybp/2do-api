const CognitoExpress = require('cognito-express');
const { httpStatus } = require('../utils/constants');
const ApiError = require('../utils/ApiError');

const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: 'access',
  tokenExpiration: 3600000
});

const auth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const accessToken = req.headers.authorization.split(' ')[1];
    cognitoExpress.validate(accessToken, (err, response) => {
      if (err) next(new ApiError(httpStatus.UNAUTHORIZED, 'access token invalid'));
      next();
    });
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'access token required');
  }
};

module.exports = auth;
