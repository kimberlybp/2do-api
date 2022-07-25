const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskListSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: 'User ID required',
    ref: 'Users'
  },
  name: {
    type: String,
    required: 'Name required'
  }
}, {
  collection: 'task lists',
  versionKey: false
});

const TaskList = mongoose.model('TaskLists', taskListSchema);

module.exports = TaskList;
