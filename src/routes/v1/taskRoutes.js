const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
//TODO: add back validation
// const validation = require('../../validations').taskValidation;
const controller = require('../../controllers/taskController');

router
  .route('/')
  .post(controller.createTask);

router
  .route('/userId/:user_id')
  .get(controller.getAllUserTasks);

router
  .route('/:id')
  .put(controller.updateTask);

module.exports = router;
