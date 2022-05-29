'use strict';

module.exports = function(app) {
  const user = require('../controllers/userController');

  app
    .route('/users')
    .post(user.create_user);
};