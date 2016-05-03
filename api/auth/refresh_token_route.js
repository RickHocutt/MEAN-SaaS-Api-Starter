var User = require('../user/user_model');
var config = require('../config');
module.exports = function (app, jwt, route) {
    /** 
     * About /auth/refresh_token_route -> route.get('/auth/refresh'):
     * Our token was already validated by /auth/validate_token_route (because it comes first in index.js.
     * Since the JWT token is valid, we can generate a new one that 3 days from now.)
     * If the front-end application hits this route and updates its cached token with a new one 
     * each time a user is online, the user will never need to log on unless they've been absent
     * more than a week.
    */
    route.post('/auth/refresh', function (req, res){
        var u = req.user;
        User.findOne({
            username: u.username,
        }).select('username fname lname email token confirmed roles').populate('roles').exec(function(err, user){
            if (!err && user) {
                var token = jwt.sign(
                    {key: user._id}, app.get('bigSecret'), 
                    {
                        expiresIn: config.jwtExpiry
                    }
                );
                user.token = token;
                
                user.save(function (err, dbRes) {
                    if (!err) {
                        console.log('Saved refreshed user token.');
                        dbRes.token = undefined;
                        res.json({
                            message: 'Authenticated user.',
                            data: {
                                user: dbRes,
                                token: token
                            }
                        });
                    } else {
                        console.log('Unable to save token.');
                    }
                });
           } else {
               console.log('Uh Oh, Token refresh problem.', err);
               send403();
           }
        });
        function send403() {
            res.status(403).send({ 
                error: 'Invalid user.', 
                message: 'The user supplied is not in our system.' 
            });
        }
    });
};