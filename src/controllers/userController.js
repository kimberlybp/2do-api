'use strict';

const mongoose = require('mongoose');

const User = mongoose.model('Users');

exports.create_user = function(req, res) {
  const newUser = new User(req.body);
  // console.log(req);
  newUser.save(function(err, task) {
    if (err) {
      res.send(err);
    }
    res.json(task);
  });
};