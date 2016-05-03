
var User = require('../user/user_model');
var config = require('../config');

module.exports = function (app, jwt, route) {
    /** 
     * About /auth route:
     * Use provided user name and password to generate a JWT token that will be used to
     * authenticate API requests.
     */
    route.post('/auth/login', function (req, res){
        /* Look up the user based on their username. */
        User.findOne({username: req.body.username })
            .select('password username fname lname email roles token confirmed')
            .populate('roles').exec(function(err, user){
                if (err) { // There was an error communicating with the database
                    res.json({ error: 'Authentication failure.', message: 'Authentication failed.'});
                } else if (!user) { // Returned an empty result from the database
                    res.json({ error: 'Authentication failure.', message: 'Authentication failed. No user.'});
                } else { // Cooking with gas here. We have found a real user!
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (err || !isMatch) {
                            res.json({ error: 'Authentication failure', message: 'Authentication failed. Name or password does not match.'});
                        } else {
                            user.token = undefined;
                            user.password = undefined;
                            console.log("Create token with user id", user._id);
                            var token = jwt.sign({key:user._id}, app.get('bigSecret'), 
                                {
                                    expiresIn: config.jwtExpiry // Taken from config.js and made available in index.js
                                }
                            );
                            user.token = token;
                            user.password = req.body.password;
                            user.save(function (err, dbRes) {
                                dbRes.password = undefined;
                                dbRes.token = undefined;
                                res.json({
                                    message: 'Authenticated user.',
                                    data: {
                                        user: dbRes,
                                        token: token
                                    }
                                });
                            });
                        }
                    });
                }
            });
    });
    route.get('/auth/logout', function (req, res){
        // Take token from request, set expiration to past. Return token.
        // Check header a JWT token.
        var token = req.headers && req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        
        // Decode JWT token.
        if (token) {
            // Verify secret and check token expiration.// Verify secret and check token expiration.
            jwt.verify(token, app.get('bigSecret'), function(err, decoded) { 
                if (err) {
                    // Things didn't go as planned, but the token's not valid so user's logged out.
                    sayLoggedOut();
                } else {
                    var userId = decoded ? decoded.key : null;
                    User.findById(userId, function(err, user){ 
                        // Does the user have this token? If so delete it.
                        if (user) {
                            user.token = undefined;
                            user.save(function (err){
                                console.log('User\'s token deleted.');
                            });
                        }
                        sayLoggedOut();
                    });
                }
            });
        } else {
            sayLoggedOut();
        }
        
        function sayLoggedOut(){
            res.json({
                message: 'Logged Out', 
                data: {success: true}
            });
        }
    });
};