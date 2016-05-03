System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function isLoggedIn() {
        var token = localStorage.getItem('id_token');
        return (token && token.length);
    }
    exports_1("isLoggedIn", isLoggedIn);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=is-loggedin.js.map