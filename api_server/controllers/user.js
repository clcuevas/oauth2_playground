'use strict';

// Load required packages
let User = require('../models/user');

// Create endpoint for /api/users for POST
exports.postUsers = function (req, res) {
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function (err) {
    if (err) res.send(err);

    res.json({ user: user });
  });
};

// Create endpoint for /api/users for GET
exports.getUsers = function (req, res) {
  User.find(function (err, users) {
    if (err) res.send(err);

    res.json({ users: users });
  });
};
