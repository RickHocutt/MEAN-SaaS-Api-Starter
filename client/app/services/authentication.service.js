System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', './logger.service', 'rxjs/add/observable/fromArray', '../config'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, logger_service_1, config_1;
    var Authentication;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (_1) {},
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            Authentication = (function () {
                function Authentication(_logger, _http, _config) {
                    this._logger = _logger;
                    this._http = _http;
                    this._config = _config;
                    this.isLoaded = false;
                    this.token = this.getToken();
                    this._setAdmin = function () {
                        var roles = this.user ? this.user.roles : null;
                        this.admin = false;
                        if (roles)
                            for (var i = 0; i < roles.length; i++) {
                                if (roles[i].label === 'admin') {
                                    this.admin = true;
                                }
                            }
                    };
                    this.isAdmin = function () {
                        var options = new http_1.RequestOptions({
                            method: http_1.RequestMethod.Get,
                            url: this._config.apiEndpoint + '/isadmin',
                            headers: new http_1.Headers({
                                "Content-Type": "application/json",
                                'Authorization': 'Bearer ' + this.getToken()
                            })
                        });
                        var request = new http_1.Request(options);
                        return this._http.request(request)
                            .map(function (res) {
                            return res.json();
                        });
                    };
                    this._setCachedToken = function (token) {
                        localStorage.setItem('id_token', token);
                    };
                    this._clearCachedToken = function () {
                        localStorage.removeItem('id_token');
                    };
                }
                Authentication.prototype.getToken = function () {
                    return localStorage.getItem('id_token') || '';
                };
                Authentication.prototype.refresh = function () {
                    var _this = this;
                    var options = new http_1.RequestOptions({
                        method: http_1.RequestMethod.Post,
                        url: this._config.apiEndpoint + '/auth/refresh',
                        headers: new http_1.Headers({
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + this.getToken()
                        }),
                        body: '{ "message": "Refreshing user token." }'
                    });
                    var request = new http_1.Request(options);
                    return this._http.request(request)
                        .map(function (res) {
                        var doc = res.json();
                        if (doc && doc.data && doc.data.token && doc.data.user) {
                            _this._setCachedToken(doc.data.token);
                            _this.user = doc.data.user;
                            _this._setAdmin();
                            return _this.user;
                        }
                        else {
                            _this.logout();
                            _this._setAdmin();
                        }
                    });
                };
                Authentication.prototype.login = function (user) {
                    var _this = this;
                    var options = new http_1.RequestOptions({
                        method: http_1.RequestMethod.Post,
                        url: this._config.apiEndpoint + '/auth/login',
                        headers: new http_1.Headers({
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + this.getToken()
                        }),
                        body: JSON.stringify(user)
                    });
                    var request = new http_1.Request(options);
                    return this._http.request(request)
                        .map(function (res) {
                        var doc = res.json();
                        if (doc && doc.data && doc.data.token && doc.data.user) {
                            _this._setCachedToken(doc.data.token);
                            _this.user = doc.data.user;
                            _this._setAdmin();
                            return doc.data;
                        }
                        else {
                            _this._setAdmin();
                            return { 'error': doc.error, 'message': doc.message };
                        }
                    });
                };
                Authentication.prototype.logout = function () {
                    var _this = this;
                    var options = new http_1.RequestOptions({
                        method: http_1.RequestMethod.Get,
                        url: this._config.apiEndpoint + '/auth/logout',
                        headers: new http_1.Headers({
                            "Content-Type": "application/json",
                            'Authorization': 'Bearer ' + this.getToken()
                        })
                    });
                    var request = new http_1.Request(options);
                    return this._http.request(request)
                        .map(function (res) {
                        _this._clearCachedToken();
                        _this.user = undefined;
                        return res.json();
                    });
                };
                Authentication.prototype.verifyResetPassword = function (str, token) {
                    var options = new http_1.RequestOptions({
                        method: http_1.RequestMethod.Post,
                        url: token ? this._config.apiEndpoint + '/auth/password-reset' : this._config.apiEndpoint + '/auth/verify-password-reset',
                        headers: new http_1.Headers({
                            "Content-Type": "application/json"
                        }),
                        body: token ? JSON.stringify({ password: str, token: token }) : JSON.stringify({ email: str })
                    });
                    var request = new http_1.Request(options);
                    if (str || token) {
                        return this._http.request(request)
                            .map(function (res) {
                            var doc = res.json();
                            return doc;
                        });
                    }
                    else {
                        return Observable_1.Observable.of({ error: 'Invalid parameter: email, password or token' });
                    }
                };
                Authentication = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_service_1.Logger, http_1.Http, config_1.Config])
                ], Authentication);
                return Authentication;
            }());
            exports_1("Authentication", Authentication);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map