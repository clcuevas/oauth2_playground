'use strict';

// Load required packages
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let passport = require('passport');

let itemController = require('./controllers/item');
let userController = require('./controllers/user');
let authController = require('./controllers/auth');
let clientController = require('./controllers/client');

// Connect to MongoDB
mongoose.connect('mongodb://ember:soccer15@ds031183.mlab.com:31183/freezr_dev');

// Create the express application
let app = express();

// Use the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));
// Use the passport package
app.use(passport.initialize());

// Define the port the server will use
let port = process.env.PORT || 8000;

// Create the Express Router
let router = express.Router();

// Create endpoint handlers
// =========================================
router.route('/items')
  .post(authController.isAuthenticated, itemController.postItem)
  .get(authController.isAuthenticated, itemController.getItems);

router.route('/items/:id')
  .get(authController.isAuthenticated, itemController.getItem)
  .put(authController.isAuthenticated, itemController.putItem)
  .delete(authController.isAuthenticated, itemController.deleteItem);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log(`Server running on PORT ${port}`);
