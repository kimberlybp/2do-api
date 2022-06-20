const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colourPaletteSchema = new Schema({
  name: String,
  colours: [
    {
      order: {
        type: Number,
        required: 'Order required'
      },
      hex: {
        type: String,
        required: 'Hex required'
      }
    }
  ]
}, {
  collection: 'colour palettes',
  versionKey: false
});

const ColourPalette = mongoose.model('Colour Palettes', colourPaletteSchema);

module.exports = ColourPalette;
