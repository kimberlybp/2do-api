const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const validation = require('../../validations').taskListValidation;
const controller = require('../../controllers/taskListController');

router
  .route('/')
  .post(validate(validation.createTaskList), controller.createTaskList);

router
  .route('/:id')
  .get(validate(validation.getTaskList), controller.getTaskList)
  .put(validate(validation.updateTaskList), controller.updateTaskList)
  .delete(validate(validation.deleteTaskList), controller.deleteTaskList);

router
  .route('/userId/:user_id')
  .get(validate(validation.getTaskListsbyUserId), controller.getTaskListsbyUserId);

module.exports = router;
