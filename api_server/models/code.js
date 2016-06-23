'use strict';

// Load required packages
let mongoose = require('mongoose');

let CodeSchema = new mongoose.Schema({
  // Store the authorization code
  value: { type: String, required: true },
  redirectUri: { type: String, required: true },
  // Store the user that owns the code
  userId: { type: String, required: true },
  // Store the client that owns the code
  clientId: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Code', CodeSchema);
