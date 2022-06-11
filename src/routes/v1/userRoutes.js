const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const { userValidation } = require('../../validations');
const userController = require('../../controllers/userController');

router
  .route('/')
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
