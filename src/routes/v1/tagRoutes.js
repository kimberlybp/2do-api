const express = require('express');
const router = express.Router();
const validate = require('../../middleware/validate');
const validation = require('./../../validations').tagValidation;
const controller = require('../../controllers/tagController');

router
  .route('/')
  .post(validate(validation.createTag), controller.createTag);

router
  .route('/:id')
  .get(validate(validation.getTag), controller.getTag)
  .put(validate(validation.updateTag), controller.updateTag)
  .delete(validate(validation.deleteTag), controller.deleteTag);

router
  .route('/:userId')
  .get(validate(validation.getTagsbyUserId), controller.getTagsbyUserId);

module.exports = router;
