System.register(['./app-injector', 'rxjs/add/observable/fromArray', '../services/authentication.service', '../services/logger.service', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_injector_1, authentication_service_1, logger_service_1, router_1;
    var isAdmin;
    return {
        setters:[
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (_1) {},
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            exports_1("isAdmin", isAdmin = function (next, previous) {
                var injector = app_injector_1.appInjector(); // get the stored reference to the injector
                var auth = injector.get(authentication_service_1.Authentication);
                var router = injector.get(router_1.Router);
                var logger = injector.get(logger_service_1.Logger);
                //return a boolean or a promise that resolves a boolean
                return new Promise(function (resolve) {
                    logger.log('Is admin? ' + auth.admin);
                    if (!auth.admin)
                        router.navigate(['Home']);
                    resolve(auth.admin);
                });
            });
        }
    }
});
//# sourceMappingURL=is-admin.js.map