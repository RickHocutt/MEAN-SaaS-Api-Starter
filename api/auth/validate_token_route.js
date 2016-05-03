var User = require('../user/user_model');

module.exports = function (app, jwt, route) {
    /** 
     * About /auth/validate_token_route: 
     * Use ExpressJS router instance middleware to validate all routes included
     * below this router in index.js.
     */ 
    route.use(function(req, res, next) {
        // Check header a JWT token.
        var token = req.headers && req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        // Decode JWT token.
        if (token) {
            // Verify secret and check token expiration.
            jwt.verify(token, app.get('bigSecret'), function(err, decoded) { 
                // If the JWT token is not valid, err will have a value.
                if (err) {
                    // Let the user know validation failed.
                    return res.json({ error: err, message: 'Failed to authenticate token.' });    
                } else {
                    var userId = decoded ? decoded.key : null;
                    // Is token registered?
                    User.findById(userId)
                        .select('username fname lname email roles token')
                        .populate('roles')
                        .exec(function(err, usr) {
                            if(usr && usr.isTokenRegistered(token)) {
                                usr.token = undefined;
                                req.user = usr;  
                                next(); // Move on to other matching routes.  
                            } else {
                                return403();
                            }
                        });
                }
            });
        } else {
            // If there is no JWT token, let the user know validation failed.
            return403();
        }
            
        function return403() {
            res.status(403).send({ 
                error: 'Token missing or not registered to your user.', 
                message: 'No token provided.' 
            });
        }
    });
}