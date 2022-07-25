const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: 'User ID required',
    ref: 'Users'
  },
  title: {
    type: String,
    required: 'Title required'
  },
  description: {
    type: String,
    required: 'Description required'
  },
  date_notified: Date,
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tasks'
  }
}, {
  collection: 'notifications',
  versionKey: false
});

const Notification = mongoose.model('Notifications', notificationSchema);

module.exports = Notification;
