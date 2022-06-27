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
  .route('/:userId')
  .get(controller.getAllUserTasks);

module.exports = router;
