// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/** 
 * About /role/role_model:
 * Create a Mongoose model for our user roles.
 */
module.exports = mongoose.model('UserRole',
    new Schema({
        label: { 
            type: String,
            required: [true, 'Every role must have a role label.']
        }
    })
);