
var UserRole = require('./role_model'),
    _ = require('underscore'),
    authorize = require('../auth/authorize_user');

module.exports = function (route) {
    /**
     * About /role/role_routes -> /role:
     * This route looks up all user role records stored in the database and returns them.
     */
    /* Create */
    route.post('/role', authorize('admin'), function (req, res){
        var role = new UserRole(req.body);
        // Validate
        var err = role.validateSync();
        if (!err) {
        // Add to database
            role.save(function (err, role){
                if (!err) {
                    console.log('Role added');
                    res.json({message: 'Role added.', data: role});
                } else {
                    res.json({message: 'Role not added.', error: err});
                }
            });
        } else {
            res.json({message: 'Role not valid.', error: err});
        }
    });
    /* Read */
    route.get('/role', authorize('admin'), function (req, res) {
        UserRole.find({}).exec(function (err, roles) {
            res.json({ data: roles});
        });
    });
    route.get('/role/:id', authorize('admin'), function (req, res) {
        UserRole.findById(req.params.id, function (err, role) {
            res.json({ data: role});
        });
    });
    /* Update */
    route.put('/role/:id', authorize('admin'), function (req, res){
        console.log('Update by role id', JSON.stringify({_id: req.params.id}), req.body);
        UserRole.findById(req.params.id, function (err, doc) {
            var role = _.extend(doc, req.body);
            role.save(function (err, doc){
                console.log('Update role attempted. ', err, doc);
                if (err) {
                    res.json({
                        message: 'Error updating the role.',
                        error: err
                    });
                } else {
                    res.json({
                        message: 'Successfully updated the role.',
                        data: {success: true}
                    });
                }
            });
        });
    });
    /* Delete */
    route.delete('/role/:id', authorize('admin'), function (req, res) {
        UserRole.findByIdAndRemove(req.params.id).exec(function (err, role){
            if (err) {
                res.json({
                    message: 'Error deleting role', 
                    error: err
                });
            }
            else if (user) {
                res.json({
                    message: 'Role deleted.', 
                    data: role
                });
            } 
            else {
                res.json({
                    message: 'Role not deleted',
                    error: 'Unknown error deleting a role.'
                });
            }
        });
    });
};