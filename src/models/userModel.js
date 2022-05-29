'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isEmailValidator = require('validator').isEmail;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: 'First name required'
  },
  last_name: {
    type: String,
    required: 'Last name required'
  },
  email: {
    type: String,
    validate: [isEmailValidator, 'Valid email required']
  },
  created_at: Date,
  updated_at: Date,
  profile_pic_url: String
}, {
  collection: 'users',
  versionKey: false
});

module.exports = mongoose.model('Users', UserSchema);