require('colors');
const path = require('path');
const envFilePath = path.resolve(__dirname, './.env');
const env = require("dotenv").config({ path: envFilePath });
if (env.error) {
  throw new Error(`Unable to load the .env file.`);
}

const PORT = process.env.PORT;
const PROD_ENV = 'production';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./src/routes/userRoutes');

const app = express();

app.use(helmet());

// eslint-disable-next-line no-unused-vars
const User = require('./src/models/userModel');

var whitelist = [];

//Prep CORS firewall
if (process.env.NODE_ENV == PROD_ENV) {
    //TODO
} else {
    whitelist.push('http://localhost:3000');
    whitelist.push('http://localhost:5000');
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

//Enable CORS for all requests
app.use(cors(corsOptions));

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:8000/2do-test')
  .catch(err => {
    console.log('Unable to connect', err);
  });

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
    });
});

routes(app);

app.listen(PORT, () => {
    console.log(`Express Server (API) up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold);
})