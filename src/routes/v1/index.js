const express = require('express');
const userRoute = require('./userRoutes');
const taskListRoute = require('./taskListRoutes');
const tagRoute = require('./tagRoutes');

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
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
