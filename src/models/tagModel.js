const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./taskModel.js');
const ObjectId = mongoose.Types.ObjectId; 

const tagSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: 'User ID required',
    ref: 'Users'
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
