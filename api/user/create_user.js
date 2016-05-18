var User = require('./user_model'),
    mail = require('../mail/send_mail'),
    config = require('../config');

function getConfirmedToken(email, jwt, app) {
    var token = jwt.sign(email, app.get('bigSecret'), 
        {
            expiresIn: '1d' // 1 day expiry.
        }
    );
    return token;
}
function createUser(req,res, jwt, app) {
    var user = new User(req.body),
            confirmToken,
            jot = jwt;
        // Validate: prefer the doc.validate method to doc.validateSync because some validation may be asynchronous.
        var err = user.validate(function (err) {
            if (!err) {
                user.confirmed = false;
                // Add to database
                user.save(function (err){
                    if (!err) {
                        console.log('User added');
                        confirmedToken = getConfirmedToken(user.email, jot, app);
                        user.confirmedToken = confirmedToken
                        user.save(function(err, user) {
                            if (!err) {
                                var mailBody = 'Click the link to confirm your account at ' + config.appName + '. http://localhost:8081/#/auth/confirm-user/' + confirmedToken;
                                mail(user.email, null, 'Confirm Your ' + config.appName + ' Account', mailBody);
                                user.confirmedToken = undefined;
                                user.password = undefined;
                                res.json({message: 'User added.', data: {user: user}});
                            } else {
                                res.json({message: 'User could not be added.', error: err});
                            }
                            console.log('Save user results', err, user);
                        });
                    } else {
                        res.json({message: 'User could not be added.', error: err});
                    }
                });
            } else {
                err.op = undefined;
                res.json({message: 'User not valid.', error: err});
            }
        });
}
module.exports = createUser;