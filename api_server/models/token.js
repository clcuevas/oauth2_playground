'use strict';

// Load required packages
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let TokenSchema = new mongoose.Schema({
  // The actual token is stored here
  value: { type: String, required: true },
  // Grabs the user and stores it here
  userId: { type: String, required: true },
  // Grabs the client and stores it here
  clientId: { type: String, required: true }
});

// Execute before each token.save() call
TokenSchema.pre('save', function (callback) {
  let token = this;

  // Break out if the token value doesn't match
  if (!token.isModified('value')) return callback();

  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(token.value, salt, null, function (err, hash) {
      if (err) return callback(err);

      token.value = hash;
      callback();
    });
  });
});

// Export the model
module.exports = mongoose.model('Token', TokenSchema);
