
var User = require('./user_model'),
    authorize = require('../auth/authorize_user'),
    hasRole = require('../auth/authorize_fn'),
    mail = require('../mail/send_mail'),
    _ = require('underscore'),
    createUser = require('./create_user');

module.exports = function (app, jwt, route) {
    var myApp = app,
        jot = jwt;
    /**
     * About /user/user_routes -> /user:
     * This route looks up all user records stored in the database and returns them.
     */
    /* Create */
    route.post('/user', authorize('admin'), function (req, res){
        createUser(req, res, jot, myApp);
    });
    /* Read list of users */
    route.get('/user', authorize('admin'), function (req, res) {
        User.find({}).populate('roles').exec(function (err, users) {
            if (!err) {
                res.json({ data: users});
            } else {
                res.status(403).send({ 
                    error: 'User not authorized.', 
                    message: 'You do not have authorization to view this resource.' 
                });
            }
        });
    });
    /* Read a single user by ID. */
    route.get('/user/:id', function (req, res) {
        hasRole(req.user._id, 'admin', function (isAdmin) {
            console.log('Get user ', isAdmin, req.user._id, req.params.id);
            if (isAdmin || req.user._id == req.params.id) {
                // Get the requested user
                console.log('User is authorized to get a user\'s details');
                User.findById(req.params.id).populate('roles').exec(function (err, user) {
                    // Return user data
                    res.json({ 
                        data: {
                            user: user 
                        }
                    });
                });
            } else {
                function return403() {
                    res.status(403).send({ 
                        error: 'User not authorized.', 
                        message: 'You do not have authorization to view this resource.' 
                    });
                }
            }
        });
    });
    /* Update a user */
    route.put('/user/:id', function (req, res) {
        console.log('Updating user: ' + req.params.id);
        hasRole(req.user._id, 'admin', function (isAdmin) {
            console.log('isAdmin?', isAdmin);
            if (isAdmin || req.user._id == req.params.id) {
                console.log('Update by user id', JSON.stringify({_id: req.params.id}), req.body);
                User.findById(req.params.id, function (err, doc) {
                    var user = _.extend(doc, req.body);
                    user.save(function (err, doc){
                        console.log('Update user attempted. ', err, doc);
                        if (err) {
                            delete err.op;
                            // TODO: read error messages in err and convert to human readable.
                            // Possible values: "The username you chose is already in use." 
                            // or "The email address you chose is already in use."
                            res.json({
                                message: 'Error updating the user.',
                                error: err
                            });
                        } else {
                            res.json({
                                message: 'Successfully updated the user.',
                                data: {success: true}
                            });
                        }
                    });
                });
            } else {
                res.status(403).send({ 
                    error: 'User not authorized.', 
                    message: 'You do not have authorization to view this resource.' 
                });
            }
        });
    });
    /* Delete */
    route.delete('/user/:id', authorize('admin'), function (req, res) {
        console.log('Is this user deleting himself?', req.user._id, req.params.id);
        if (req.user._id.toString().trim() === req.params.id.toString().trim()) {
            console.log('Yes. This user is deleting himself!');
            res.json({
                message: 'Authorization: User not deleted',
                error: 'A user cannot delete himself.'
            });
        } else {
            User.findByIdAndRemove(req.params.id).exec(function (err, user){
                if (err) {
                    res.json({
                        message: 'Error deleting user', 
                        error: err
                    });
                }
                else if (user) {
                    res.json({
                        message: 'User deleted.', 
                        data: user
                    });
                } 
                else {
                    res.json({
                        message: 'User not deleted',
                        error: 'Unknown error deleting a user.'
                    });
                }
            });
        }
    });
};