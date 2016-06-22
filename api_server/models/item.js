'use strict';

// Load required packages
let mongoose = require('mongoose');

let ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  userId: { type: String }
});

// Export the model
module.exports = mongoose.model('Item', ItemSchema);
