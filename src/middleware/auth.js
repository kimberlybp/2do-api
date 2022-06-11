const CognitoExpress = require('cognito-express');
const { AuthError } = require('../utils/ApiError');

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
      if (err) throw new AuthError('auth');
      else next();
    });
  } else {
    throw new AuthError('token');
  }
};

module.exports = auth;
