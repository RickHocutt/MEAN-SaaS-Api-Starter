System.register(['angular2/core', 'angular2/common', '../models/user', '../services/authentication.service', 'angular2/router', '../services/logger.service'], function(exports_1, context_1) {
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
    var core_1, common_1, user_1, authentication_service_1, router_1, logger_service_1;
    var LoginFormComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            LoginFormComponent = (function () {
                function LoginFormComponent(_auth, _router, _logger) {
                    this._auth = _auth;
                    this._router = _router;
                    this._logger = _logger;
                    this.error = false;
                    this.login = function () {
                        var _this = this;
                        this._logger.log('Logging in ...');
                        this.submitted = true;
                        this.error = false;
                        this._auth.login(this.model)
                            .subscribe(function (data) {
                            if (data.error) {
                                _this.error = true;
                                _this._logger.log('Not a valid user.');
                            }
                            else {
                                console.log(data);
                                if (data.user && data.user.confirmed) {
                                    _this.goHome();
                                }
                                else {
                                    _this.goNotConfirmed();
                                }
                            }
                        }, function (err) { _this._logger.log('Error: ' + JSON.stringify(err)); }, function () {
                            _this._logger.log('Login Request Complete');
                            _this.submitted = false;
                        });
                    };
                    this.goHome = function () {
                        var link = ['/Home'];
                        this._router.navigate(link);
                    };
                    this.goNotConfirmed = function () {
                        var link = ['/NotConfirmed'];
                        this._router.navigate(link);
                    };
                    this.model = new user_1.User('', '');
                    this.submitted = false;
                }
                LoginFormComponent = __decorate([
                    core_1.Component({
                        selector: 'login-form',
                        templateUrl: 'app/html/login-form.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            common_1.NgClass
                        ]
                    }), 
                    __metadata('design:paramtypes', [authentication_service_1.Authentication, router_1.Router, logger_service_1.Logger])
                ], LoginFormComponent);
                return LoginFormComponent;
            }());
            exports_1("LoginFormComponent", LoginFormComponent);
        }
    }
});
//# sourceMappingURL=login-form.component.js.map