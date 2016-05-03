System.register(['angular2/core', './services/authentication.service', 'angular2/router', './services/logger.service'], function(exports_1, context_1) {
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
    var core_1, authentication_service_1, router_1, logger_service_1;
    var LoadingComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            LoadingComponent = (function () {
                function LoadingComponent(_logger, auth, _router, params) {
                    this._logger = _logger;
                    this.auth = auth;
                    this._router = _router;
                    this.params = params;
                    this.message = "Loading ...";
                    this.goHome = function () {
                        this._logger.log('Go home.');
                        this.auth.isLoaded = true;
                        var link = ['Home'];
                        this._router.navigate(link);
                    };
                    this.goNotConfirmed = function () {
                        this._logger.log('Go not confirmed.');
                        var link = ['NotConfirmed'];
                        this._router.navigate(link);
                    };
                    this.logout = function () {
                        var _this = this;
                        this.auth.logout().subscribe(function (res) {
                            _this._logger.log('Logged out.');
                        }, function (err) {
                            _this._logger.log('Couldn\'t log out.');
                        });
                    };
                    this.redirectTo = params.get('redirectTo') ? params.get('redirectTo') : 'home';
                }
                LoadingComponent.prototype.routerOnActivate = function (next, prev) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        _this._logger.log('Router activated.' + _this.redirectTo.indexOf('/confirmUser/') + ' ' + _this.redirectTo);
                        if (_this.redirectTo.indexOf('auth/') > -1) {
                            _this._logger.log('User or password is being confirmed.');
                            resolve(true);
                            _this._router.navigateByUrl('/' + _this.redirectTo);
                        }
                        else {
                            _this.auth.refresh()
                                .subscribe(function (res) {
                                if (res.confirmed) {
                                    _this._logger.log('has user');
                                    _this._logger.log('redirectTo: ' + _this.redirectTo);
                                    resolve(true);
                                    _this._router.navigateByUrl('/' + _this.redirectTo);
                                }
                                else {
                                    _this._logger.log('User not confirmed.');
                                    resolve(true);
                                    _this.goNotConfirmed();
                                }
                            }, function (err) {
                                _this.logout();
                                resolve(true);
                                _this.goHome();
                            });
                        }
                    });
                };
                LoadingComponent = __decorate([
                    core_1.Component({
                        selector: 'loading',
                        templateUrl: 'app/html/loading.component.html'
                    }), 
                    __metadata('design:paramtypes', [logger_service_1.Logger, authentication_service_1.Authentication, router_1.Router, router_1.RouteParams])
                ], LoadingComponent);
                return LoadingComponent;
            }());
            exports_1("LoadingComponent", LoadingComponent);
        }
    }
});
//# sourceMappingURL=loading.component.js.map