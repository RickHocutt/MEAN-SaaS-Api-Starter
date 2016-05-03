
var User = require('./user_model'),
    authorize = require('../auth/authorize_user'),
    hasRole = require('../auth/authorize_fn');

module.exports = function (route) {
    /* Confirm user */
    route.put('/user/confirm/:token', function (req, res) {
        User.findOne({confirmedToken: req.params.token}).select('_id confirmedToken confirmed').exec(function(err, user) {
            console.log('Confirm user attempted. ', err, user);
            if (err) {
                console.log('Error looking up user by confirmedToken.');
                res.json({ 
                    error: 'Database Error', 
                    message: 'Error looking up user by confirmedToken.' 
                });
            } else {
                console.log('Successfully looked up the user\'s confirmedToken.', user);
                
                User.update({ _id: user._id }, {confirmed: true}, {runValidators: false, multi: false }, function (err, dbRes) {
                    if (!err) {
                        console.log('Successfully confirmed the user.', dbRes);
                        res.json({message: 'Account confirmed.', data: {success:true}});
                    } else {
                        res.json({message: 'Account confirmation failure.', error: err ? err : 'User not confirmed.'});
                    }
                })
            }
        });
    });
}