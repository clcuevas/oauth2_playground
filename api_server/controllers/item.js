'use strict';

// Load required packages
let Item = require('../models/item');

// Create endpoint /api/items for POSTS
exports.postItem = function (req, res) {
  let item = new Item();

  item.name = req.body.name;
  item.type = req.body.type;
  item.quantity = req.body.quantity;
  item.userId = req.user._id;

  item.save(function (err) {
    if (err) res.send(err);

    res.json({ msg: 'Item has been added', item: item });
  });
};

// Create endpoint /api/items for GET
exports.getItems = function (req, res) {
  Item.find({ userId: req.user._id }, function (err, items) {
    if (err) res.send(err);

    res.json(items);
  });
};

// Create endpoint for /api/items/:id for PUT
exports.putItem = function (req, res) {
  Item.update({ userId: req.user._id, _id: req.params.id }, function (err, item) {
    if (err) res.send(err);

    item.name = req.body.name;
    item.type = req.body.type;
    item.quantity = req.body.quantity;

    item.save(function (err) {
      if (err) res.send(err);

      res.json(item);
    });
  });
};

// Create endpoint for /api/items/:id for GET
exports.getItem = function (req, res) {
  Item.find({ userId: req.user._id, _id: req.params.id }, function (err, item) {
    if (err) res.send(err);

    res.json(item);
  });
};

// Create endpoint for /api/items/:id for DELETE
exports.deleteItem = function (req, res) {
  Item.findByIdAndRemove(req.params.id, function (err) {
    if (err) res.send(err);

    res.json({});
  });
};
