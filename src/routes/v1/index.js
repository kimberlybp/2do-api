const express = require('express');
const userRoute = require('./userRoutes');
const colourpaletteRoute = require('./colourpaletteRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/colourpalettes',
    route: colourpaletteRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
