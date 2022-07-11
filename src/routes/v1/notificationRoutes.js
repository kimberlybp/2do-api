const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const validation = require('./../../validations');
const controller = require('../../controllers/notificationController');

router
  .route('/')
  .post(validate(validation.createNotification), controller.createNotification);

router
  .route('/:id')
  .get(validate(validation.getNotification), controller.getNotification)
  .delete(validate(validation.deleteNotification), controller.deleteNotification);

router
  .route('/userId/:user_id')
  .get(validate(validation.getNotificationsbyUserId), controller.getNotificationsbyUserId);

module.exports = router;
