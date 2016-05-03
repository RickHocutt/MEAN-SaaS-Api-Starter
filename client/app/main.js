System.register(['angular2/platform/browser', 'angular2/core', './helpers/app-injector', './app.component', './services/authentication.service', './services/user.service', './services/role.service', './config', './services/logger.service', 'angular2/router', 'angular2/http', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, core_1, app_injector_1, app_component_1, authentication_service_1, user_service_1, role_service_1, config_1, logger_service_1, router_1, http_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_injector_1_1) {
                app_injector_1 = app_injector_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [
                config_1.Config,
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                http_1.HTTP_PROVIDERS,
                authentication_service_1.Authentication,
                logger_service_1.Logger,
                user_service_1.UserService,
                role_service_1.RoleService
            ]).then(function (AppComponent) {
                // store a reference to the injector
                app_injector_1.appInjector(AppComponent.injector);
            });
        }
    }
});
//# sourceMappingURL=main.js.map