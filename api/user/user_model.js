// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserRole = require('../role/role_model');
/** 
 * About /user/user_model:
 * Create a Mongoose model for our users.
 */
var userSchema = new Schema({
        name: String,
        username: {
            type: String,
            index: { unique: true },
            required: [true, 'What? A user with no username!']
        },
        fname: {
            type: String,
            required: [true, 'What? A user with no first name!']
        },
        lname: {
            type: String,
            required: [true, 'What? A user with no last name!']
        },
        email: {
            type: String,
            index: { unique: true },
            required: [true, 'Without an email address how will we talk?']
        }, 
        password: {
            type: String,
            required: [true, 'No password, no open sesame.'],
            select: false
        }, 
        roles: [{
            type: Schema.Types.ObjectId,
            ref: 'UserRole',
            required: [true, 'Without a role, what will your user do?']
        }],
        confirmed: { type: Boolean, default: false },
        confirmedToken: {
            type: String,
            select: false
        },
        resetPasswordToken: {
            type: String,
            select: false
        },
        telephone: String,
        token : {
            type: String,
            select: false
        }
});
userSchema.methods.isValidRole = function(roleLabel) {
    var valid = false,
        roles = this.roles;
    for (var i = 0; i < roles.length; i++) {
        if (roles[i].label === roleLabel) {
            valid = true;
        }
    }
    return valid;
};
userSchema.methods.isTokenRegistered = function (token) {
    var registered = false;
    console.log('User\'s token', this.token);
    console.log('Provided token', token);
    if (this.token === token) {
        registered = true;
    }
    return registered;
}

userSchema.path('username').validate(function(value, next) {
    console.log('Validate username.', value);
    console.log('Is new?', this.isNew);
    if (!this.isNew) { // We want to be able to update records, but not create new ones.
        next(true);
    } else {
        this.model('User').count({ username: value }, function(err, count) {
            console.log('username ' + value, err, count);
            if (err) {
                return next(err);
            } 
            // If `count` is greater than zero, "invalidate"
            next(!count);
        });
    }
}, 'Username already used by someone else.');

userSchema.path('email').validate(function(value, next) {
    console.log('Validate email.', value);
    console.log('Is new?', this.isNew);
    if (!this.isNew) { // We want to be able to update records, but not create new ones.
        next(true);
    } else {
        this.model('User').count({ email: value }, function(err, count) {
            console.log('email ' + value, err, count);
            if (err) {
                return next(err);
            } 
            // If `count` is greater than zero, "invalidate"
            next(!count);
        });
    }
}, 'Email already used by someone else.');

userSchema.pre('save', function(next) {
    var user = this;
    
    console.log('User presave. Is modified ', user.isModified('password'), user.isNew);

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password') && !user.isNew) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
/*userSchema.methods.updatePasswordToConfirmed = function (cb) {
    this.password = this.newPassword;
    console.log(this, 'about to save password change.');
    this.save(cb);
}*/
user = mongoose.model('User', userSchema);
module.exports = user;