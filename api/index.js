var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./config');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var port = process.env.PORT || 8080;
var apiRoutes = express.Router();

// DB connection
mongoose.connect(config.database);

// Get string to generate tokens
app.set('bigSecret', config.secret);

// Body parser lets us load a JSON object from HTTP request body.
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Using morgan, you will see every request logged to the Node console.
app.use(morgan('dev'));

// Enable CORS
app.use(cors());

//Load Unauthenticated routes
require('./user/confirm_route.js')(apiRoutes);
require('./user/confirm_password_route.js')(apiRoutes);
require('./auth/reset_password_route.js')(app, jwt, apiRoutes);
require('./auth/authenticate.js')(app, jwt, apiRoutes);
require('./user/register.js')(app, jwt, apiRoutes);
require('./setup_routes.js')(apiRoutes); // Run once to add a user.

// Validate token 
require('./auth/validate_token_route.js')(app, jwt, apiRoutes); // Used by all routes that follow.

// Load Authenticated routes
require('./user/user_routes.js')(app, jwt, apiRoutes);
require('./current_user/current_user_routes.js')(apiRoutes);
require('./role/role_routes.js')(apiRoutes);
require('./auth/refresh_token_route.js')(app, jwt, apiRoutes);

// ExpressJS app will use our routes at /api/*.
app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port);
});