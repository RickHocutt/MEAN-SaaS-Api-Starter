var User = require('../user/user_model');

/**
 * Verifies a user's role.
 * @param {string} userId - The user's identifier from the database.
 * @param {string} roleLabel - The readable description of a user's role (Ex: 'admin' or 'user').
 * @param {function} cb - A function that will be called with the result of evaluating user.isValidRole.
 */
function hasRole(userId, roleLabel, cb) {
User.findById(userId).populate('roles').exec(function(err, user) {
        if(user.isValidRole(roleLabel)) {
            cb(true);
        } else {
            cb(false);
        }
    });
}

module.exports = hasRole;