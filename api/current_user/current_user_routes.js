var User = require('../user/user_model');
module.exports = function (route) {
    /**
     * Get the current user's profile information.
     */
    route.get('/currentuser', function (req, res) {
        User.findOne(req.user).populate('roles').exec(function (err, user) {
            console.log(user);
            res.json(
                { 
                    data: { 
                        user: user 
                    }
                }
            );
        });
    });
    /**
     * Is the current user and admin? Boolean (true/false)
     */
    route.get('/isadmin', function (req, res) {
        User.findOne(req.user).populate('roles').exec(function (err, user) {
            if (!err && user) {
                res.json({ data: { isAdmin: user.isValidRole('admin') }});
            } else {
                res.json({message: 'User not valid.', data: { isAdmin: false }, error: 'User does not exist.'});
            }
        });
    });
};