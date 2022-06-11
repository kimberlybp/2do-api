const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const validation = require('../../validations').userValidation;
const controller = require('../../controllers/userController');

router
  .route('/')
  .post(validate(validation.createUser), controller.createUser);

router
  .route('/:id')
  .get(auth, validate(validation.getUser), controller.getUser)
  .put(auth, validate(validation.updateUser), controller.updateUser);

router.route('/email/check').get(validate(validation.checkEmail), controller.checkEmail);

module.exports = router;
