const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isEmailValidator = require('validator').isEmail;

const subtaskSchema = new Schema({
  order: {
    type: Schema.Types.Number,
    required: 'Order required'
  },
  title: {
    type: String,
    required: 'Title required'
  },
  complete: {
    type: Schema.Types.Boolean,
    required: 'Complete required'
  },
});

const moduleSchema = new Schema({
  title: {
    type: String,
    required: 'Title required'
  },
  module_code: {
    type: String,
    required: 'Module code required'
  },
  department: String,
  faculty: String
});

const taskSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: 'UserId required',
    ref: "Users"
  },
  task_list: {
    type: Schema.Types.ObjectId,
    ref: "TaskLists"
  },
  title: {
    type: String,
    required: 'Title required'
  },
  description: String,
  complete: Schema.Types.Boolean,
  subtasks: [subtaskSchema],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
  due_date: Schema.Types.Date,
  module: moduleSchema,
  created_at: Date,
  updated_at: Date,
}, {
  collection: 'tasks',
  versionKey: false
});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
