const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const isEmailValidator = require('validator').isEmail;

const userSchema = new Schema({
  sub: {
    type: String,
    required: 'sub required'
  },
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

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
