const mongoose = require('mongoose');
const app = require('./app');

let server;
mongoose.connect("mongodb://admin:2dodevs!@52.90.1.50:27017/2do-dev").then(() => {
  console.log('Connected to MongoDB'.magenta.bold);
  server = app.listen(process.env.PORT, () => {
    console.log(`Express Server (API) up and running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.blue.bold);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed'.blue.bold);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error +"".red);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received'.blue);
  if (server) {
    server.close();
  }
});
