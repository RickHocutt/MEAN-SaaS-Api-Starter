System.register(['angular2/core', './logger.service', 'angular2/http', './authentication.service', '../config'], function(exports_1, context_1) {
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
    var core_1, logger_service_1, http_1, authentication_service_1, config_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(_logger, _http, _auth, _config) {
                    this._logger = _logger;
                    this._http = _http;
                    this._auth = _auth;
                    this._config = _config;
                }
                /* Get user data from valid token at /api/currentuser */
                UserService.prototype.getCurrentUser = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.get(this._config.apiEndpoint + '/currentuser', {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken()
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var user = doc.data;
                        return user;
                    });
                };
                UserService.prototype.getUsers = function () {
                    this._logger.log('Getting list of users.');
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.get(this._config.apiEndpoint + '/user', {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken()
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var users = doc.data;
                        return users;
                    });
                };
                UserService.prototype.getUser = function (id) {
                    this._logger.log('Getting user ' + id);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.get(this._config.apiEndpoint + '/user/' + id, {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken()
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var user = doc.data;
                        return user;
                    });
                };
                UserService.prototype.addUser = function (user) {
                    this._logger.log('Adding a user.');
                    return this._http.post(this._config.apiEndpoint + '/user', JSON.stringify(user), {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken(),
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        return doc;
                    });
                };
                UserService.prototype.register = function (user) {
                    this._logger.log('Adding a user.');
                    return this._http.post(this._config.apiEndpoint + '/register', JSON.stringify(user), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        return doc;
                    });
                };
                UserService.prototype.updateUser = function (user) {
                    this._logger.log('Updating a user.');
                    return this._http.put(this._config.apiEndpoint + '/user/' + user._id, JSON.stringify(user), {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken(),
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        return doc;
                    });
                };
                /* Not a secured route */
                UserService.prototype.confirmUser = function (token) {
                    this._logger.log('Confirming a user.');
                    return this._http.put(this._config.apiEndpoint + '/user/confirm/' + token, JSON.stringify({ data: { message: 'Confirming user account.' } }), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        return doc;
                    });
                };
                UserService.prototype.deleteUser = function (id) {
                    this._logger.log('Deleting a user.');
                    return this._http.delete(this._config.apiEndpoint + '/user/' + id, {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken(),
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        return doc;
                    });
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_service_1.Logger, http_1.Http, authentication_service_1.Authentication, config_1.Config])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map