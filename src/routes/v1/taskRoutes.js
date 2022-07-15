const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
//TODO: add back validation
const validation = require('../../validations').taskValidation;
const controller = require('../../controllers/taskController');

router
  .route('/')
  .post(validate(validation.createTask), controller.createTask);

router
  .route('/:id')
  .put(validate(validation.updateTask), controller.updateTask);

router
  .route('/:userId')
  .get(validate(validation.getAllUserTasks), controller.getAllUserTasks);

module.exports = router;
