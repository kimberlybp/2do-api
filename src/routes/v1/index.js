const express = require('express');
const userRoute = require('./userRoutes');
const taskListRoute = require('./taskListRoutes');
const tagRoute = require('./tagRoutes');
const taskRoute = require('./taskRoutes');
const notificationRoute = require('./notificationRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/tasklists',
    route: taskListRoute
  },
  {
    path: '/tags',
    route: tagRoute
  },
  {
    path: '/tasks',
    route: taskRoute
  },
  {
    path: '/notifications',
    route: notificationRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
