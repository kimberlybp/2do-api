const path = require('path');
const envFilePath = path.resolve(__dirname, './.env');
const env = require("dotenv").config({ path: envFilePath });
if (env.error) {
  throw new Error(`Unable to load the .env file.`);
}

const PROD_ENV = 'production';
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./src/routes/v1');
const { errorConverter, errorHandler } = require('./src/middleware/error');
const ApiError = require('./src/utils/ApiError');
const { httpStatus } = require('./src/utils/constants');

const app = express();

// security HTTP headers
app.use(helmet());

// body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const whitelist = [];

// prep CORS firewall
if (process.env.NODE_ENV == PROD_ENV) {
    // TODO: UPDATE WHEN DEPLOYED TO PROD
} else {
    whitelist.push('http://localhost:3000');
    whitelist.push(undefined);
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// enable CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
