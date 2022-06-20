const express = require('express');
const router = express.Router();
const controller = require('../../controllers/colourpaletteController');

router
  .route('/')
  .get(controller.getColourPalettes);

module.exports = router;
