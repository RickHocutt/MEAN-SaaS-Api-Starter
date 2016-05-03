var User = require('../user/user_model');
var hasRole = require('./authorize_fn.js');

/**
 * Used by routes to verify a user's role and authorize access.
 * @param {string} roleLabel - The readable description of a user's role (Ex: 'admin' or 'user').
 */
function requireRole(roleLabel) {
    // @param req, @param res, @param next are populated by the ExpressJS routing middleware. It "just happens" when we use this pattern.
    return function(req, res, next) {
        if (req.user) {
            var user = req.user;
            hasRole(user._id, roleLabel, function(authorized) {
                if (authorized) {
                    next();
                } else {
                    return403();
                }
            });
            
        } else {
            return403();
        }
        /**
         * Send a 403 not authorized response if the user's role does not match.
         */
        function return403() {
            res.status(403).send({ 
                error: 'User not authorized.', 
                message: 'You do not have authorization to view this resource.' 
            });
        }
    }
}
module.exports = requireRole;