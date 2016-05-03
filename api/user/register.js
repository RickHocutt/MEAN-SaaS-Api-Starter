
var User = require('./user_model'),
    authorize = require('../auth/authorize_user'),
    hasRole = require('../auth/authorize_fn'),
    mail = require('../mail/send_mail'),
    createUser = require('./create_user');

module.exports = function (app, jwt, route) {
    var myApp = app,
        jot = jwt;
    /**
     * About /user/user_routes -> /user:
     * This route looks up all user records stored in the database and returns them.
     */
    /* Create */
    route.post('/register', function (req, res){
        createUser(req, res, jot, app);
    });
};