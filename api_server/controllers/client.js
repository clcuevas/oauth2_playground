'use strict';

// Load required packages
let Client = require('../models/client');

// Create endpoint /api/client for POST
exports.postClients = function (req, res) {
  let client = new Client();

  client.name = req.body.name;
  client.id = req.body.id;
  client.secret = req.body.secret;
  client.userId = req.user._id;

  // Save the client and check for errs
  client.save(function (err) {
    if (err) res.send(err);

    res.json({ data: client });
  });
};

// Create endpoint for /api/clients for GET
exports.getClients = function (req, res) {
  Client.find({ userId: req.user._id }, function (err, clients) {
    if (err) res.send(err);

    res.json(clients);
  });
};
