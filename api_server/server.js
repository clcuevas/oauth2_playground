'use strict';

// Load required packages
let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let passport = require('passport');
let session = require('express-session');

let itemController = require('./controllers/item');
let userController = require('./controllers/user');
let authController = require('./controllers/auth');
let clientController = require('./controllers/client');
let oauth2Controller = require('./controllers/oauth2');

// REMOVE ME AT THE END
let ejs = require('ejs');

// Connect to MongoDB
mongoose.connect('mongodb://ember:soccer15@ds031183.mlab.com:31183/freezr_dev');

// Create the express application
let app = express();

// Set view engine to ejs
// REMOVE ME LATER ------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));
// Use the passport package
app.use(passport.initialize());

// Use express session support since OAuth2orize requires it
app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

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

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log(`Server running on PORT ${port}`);
