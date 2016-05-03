var User = require('../user/user_model'),
    mail = require('../mail/send_mail'),
    config = require('../config');
module.exports = function (app, jwt, route) {
    var clientUrl = config.clientUrl;
    function getConfirmedToken(string) {
        var token = jwt.sign(string, app.get('bigSecret'), 
            {
                expiresIn: config.temporaryJwtExpiry
            }
        );
        return token;
    }
    /* Confirm a user and get a reset password token */
    route.post('/auth/verify-password-reset', function (req, res) {
        User.findOne({email: req.body.email}, function (err, user){
            if (!err && user) {
                // Generate token and save in resetPasswordToken
                var token = getConfirmedToken(req.body.email);
                user.resetPasswordToken = token
                user.save(function(err, user) {
                    if (!err) {
                        var mailBody = 'Click the link to change your password at ' + clientUrl + '/#/auth/forgot-password2/' + token;
                        mail(user.email, null, 'Change Your Password at ' + config.appName, mailBody);
                        user.confirmedToken = undefined;
                        user.password = undefined;
                        res.json({message: 'Password change started.', data: {user: user}});
                    } else {
                        res.json({message: 'Password could not be changed.', error: err});
                    }
                });
            } else {
                res.json({
                    error: 'Cannot verify this account.',
                    message: 'If you are not able to remember your email address, please contact customer support.'
                });
            }
        });
    });
    
    route.post('/auth/password-reset', function (req, res) {
        if (req.body.password) {
            User.findOne({resetPasswordToken: req.body.token}, function (err, user){
                if (!err && user) {
                    user.password = req.body.password;
                    user.resetPasswordToken = '';
                    // Update password and clear token ... save.
                    user.save(function(err, user) {
                        if (!err) {
                            res.json({message: 'Password changed.', data: {success: true}});
                            // Notify user.
                            var mailBody = 'Your password at ' + config.appName + ' has been reset.'
                            mail(user.email, null, 'Password Reset Notice', mailBody);
                        } else {
                            res.json({message: 'Password could not be changed.', error: err});
                        }
                    });
                        
                } else {
                    res.json({
                        error: 'Cannot reset password.',
                        message: 'Technical trouble.'
                    });
                }
            });
        } else {
            res.json({
                error: 'No password provided.',
                message: 'Please provide a password.'
            });
        }
    });
   
};