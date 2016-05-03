
var User = require('./user/user_model');
var Role = require('./role/role_model');
module.exports = function (route) {
    route.get('/setup', function (req, res) {
        var admin = new User({
            username: 'AdminUser',
            email: 'admin2@example.com',
            fname: 'Admin',
            lname: 'User',
            confirmed: true,
            password: 'password',
            roles: []
        });
        var role = new Role({
            label: 'admin'
        });
        // Add to database
        role.save(function (err, role){
            if (!err) {
                console.log('Role added');
                admin.roles.push(role._id);
                // Add to database
                admin.save(function (err, user){
                    if (err) {
                        res.json({
                            message: 'Setup failed.',
                            error: err
                        });
                    } else {
                        res.json({
                            message: 'Setup ran successfully, and added an admin user. To login, user:' + user.username + ' and password: password', 
                            data: { 
                                admin: user,
                                roles: role 
                            }
                        });
                    }
                });
            } else {
                res.json({
                    message: 'Setup failed.',
                    error: err
                });
            }
        });
    });
};