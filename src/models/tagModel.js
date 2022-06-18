const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: 'User ID required'
  },
  name: {
    type: String,
    required: 'Name required'
  },
  colour: {
    type: String,
    required: 'Colour required'
  }
}, {
  collection: 'tags',
  versionKey: false
});

const Tag = mongoose.model('Tags', tagSchema);

module.exports = Tag;
