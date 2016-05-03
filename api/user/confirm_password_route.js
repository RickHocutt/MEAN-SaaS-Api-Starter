
var User = require('./user_model'),
    authorize = require('../auth/authorize_user'),
    hasRole = require('../auth/authorize_fn');

module.exports = function (route) {
    /* Confirm user */
    route.put('/user/confirm-password/:token', function (req, res) {
        console.log('req.params.token', req.params.token);
        User.findOne({confirmedPasswordToken: req.params.token})
            .select('confirmedPasswordToken newPassword password')
            .exec(function(err, user) {
                console.log('Confirm user password attempted. ', err, user);
                if (err) {
                    console.log('Error looking up user by confirmedPasswordToken.');
                    res.json({ 
                        error: 'Database Error', 
                        message: 'Error looking up user by confirmedPasswordToken.' 
                    });
                } else {
                    console.log('Successfully looked up the user\'s confirmedPasswordToken.', user);
                    user.updatePasswordToConfirmed(function (err, dbRes){
                        console.log('Updated password to confirmed. ', err, dbRes);
                        if (!err) {
                            res.json({ 
                                message: 'Confirmed password change.',
                                data: { success: true } 
                            });
                        } else {
                            res.json({ 
                                message: 'Could not update to new password',
                                err: err
                            });
                        }
                    });
                }
        });
    });
}