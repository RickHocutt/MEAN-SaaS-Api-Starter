System.register(['angular2/core', './home.component', './notConfirmed.component', './loading.component', './users.component', './auth.component', './role.component', './profile.component', 'angular2/router', './helpers/is-loggedin', './services/authentication.service', './services/logger.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, home_component_1, notConfirmed_component_1, loading_component_1, users_component_1, auth_component_1, role_component_1, profile_component_1, router_1, is_loggedin_1, authentication_service_1, logger_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (notConfirmed_component_1_1) {
                notConfirmed_component_1 = notConfirmed_component_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (users_component_1_1) {
                users_component_1 = users_component_1_1;
            },
            function (auth_component_1_1) {
                auth_component_1 = auth_component_1_1;
            },
            function (role_component_1_1) {
                role_component_1 = role_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (is_loggedin_1_1) {
                is_loggedin_1 = is_loggedin_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, auth, _logger) {
                    this.router = router;
                    this.auth = auth;
                    this._logger = _logger;
                    this.isLoggedIn = is_loggedin_1.isLoggedIn;
                    this.title = 'Starter UI';
                    this.logout = function () {
                        var _this = this;
                        this.auth.logout()
                            .subscribe(function () {
                            var link = ['Home'];
                            _this.router.navigate(link);
                        });
                    };
                    this.goToProfile = function () {
                        this.router.navigate(['Users/Profile']);
                    };
                    this.diagnostic = function () { return JSON.stringify(this.auth); };
                    if (!this.auth.isLoaded) {
                        this._logger.log('Not loaded yet...');
                        var link = ['Loading', { 'redirectTo': location.hash.split('#/')[1] }];
                        this.router.navigate(link);
                    }
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: 'app/html/app.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }),
                    router_1.RouteConfig([
                        { path: '/', redirectTo: ['Home'] },
                        { path: '/home', name: 'Home', component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: '/profile', component: profile_component_1.ProfileComponent, as: 'Profile' },
                        { path: '/not-confirmed', component: notConfirmed_component_1.NotConfirmedComponent, as: 'NotConfirmed' },
                        { path: '/loading', component: loading_component_1.LoadingComponent, as: 'Loading' },
                        { path: '/users/...', component: users_component_1.UsersComponent, as: 'Users' },
                        { path: '/auth/...', component: auth_component_1.AuthComponent, as: 'Auth' },
                        { path: '/roles/...', component: role_component_1.RoleComponent, as: 'Roles' }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, authentication_service_1.Authentication, logger_service_1.Logger])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map