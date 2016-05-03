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
    var RoleService;
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
            RoleService = (function () {
                function RoleService(_logger, _http, _auth, _config) {
                    this._logger = _logger;
                    this._http = _http;
                    this._auth = _auth;
                    this._config = _config;
                }
                /* Get user data from valid token at /api/role */
                RoleService.prototype.getRoles = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.get(this._config.apiEndpoint + '/role', {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken()
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var roles = doc;
                        return roles;
                    });
                };
                RoleService.prototype.getRole = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.get(this._config.apiEndpoint + '/role/' + id, {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken()
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var role = doc;
                        return role;
                    });
                };
                RoleService.prototype.editRole = function (role) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.put(this._config.apiEndpoint + '/role/' + role._id, JSON.stringify(role), {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken(),
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var roles = doc;
                        return roles;
                    });
                };
                RoleService.prototype.deleteRole = function (id) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.delete(this._config.apiEndpoint + '/role/' + id, {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken(),
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var roles = doc;
                        return roles;
                    });
                };
                RoleService.prototype.addRole = function (role) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this._http.post(this._config.apiEndpoint + '/role', JSON.stringify(role), {
                        headers: new http_1.Headers({
                            'Authorization': 'Bearer ' + this._auth.getToken(),
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        var doc = res.json();
                        var roles = doc;
                        return roles;
                    });
                };
                RoleService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_service_1.Logger, http_1.Http, authentication_service_1.Authentication, config_1.Config])
                ], RoleService);
                return RoleService;
            }());
            exports_1("RoleService", RoleService);
        }
    }
});
//# sourceMappingURL=role.service.js.map