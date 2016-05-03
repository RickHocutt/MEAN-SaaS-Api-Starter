System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(username, password, fname, lname, roles, _id, confirmed, confirmedToken) {
                    this.username = username;
                    this.password = password;
                    this.fname = fname;
                    this.lname = lname;
                    this.roles = roles;
                    this._id = _id;
                    this.confirmed = confirmed;
                    this.confirmedToken = confirmedToken;
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map