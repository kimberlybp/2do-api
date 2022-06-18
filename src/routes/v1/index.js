const express = require('express');
const userRoute = require('./userRoutes');
const tagRoute = require('./tagRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute
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
