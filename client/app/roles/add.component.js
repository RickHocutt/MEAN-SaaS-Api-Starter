System.register(['angular2/core', '../services/logger.service', '../helpers/is-admin', '../services/role.service', '../models/role', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, logger_service_1, is_admin_1, role_service_1, role_1, router_1;
    var AddRoleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (is_admin_1_1) {
                is_admin_1 = is_admin_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (role_1_1) {
                role_1 = role_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AddRoleComponent = (function () {
                function AddRoleComponent(_service, _logger) {
                    this._service = _service;
                    this._logger = _logger;
                    this.submitted = false;
                    this.success = false;
                    this.error = null;
                    this.handleSubmit = function (model) {
                        var _this = this;
                        this.submitted = true;
                        this.success = false;
                        this.error = null;
                        this.addRole(model)
                            .subscribe(function (doc) {
                            if (!doc.error) {
                                _this.success = true;
                                _this.error = false;
                            }
                            else {
                                _this.success = false;
                                _this.error = true;
                                _this.setErrorMessages(doc.error);
                            }
                        }, function (err) { return _this.success = false; }, function () { return _this.submitted = false; });
                    };
                    this.setErrorMessages = function (errorObj) {
                        var errors = errorObj.errors;
                        this.errors = [];
                        this.errors.push(errorObj.message);
                        for (var prop in errors) {
                            if (errors[prop] && errors[prop].message) {
                                this.errors.push(errors[prop].message);
                            }
                        }
                    };
                    this.addRole = function (role) {
                        this._logger.log(role);
                        return this._service.addRole(role);
                    };
                    this.diagnostic = function (obj) {
                        return JSON.stringify(obj);
                    };
                    this.model = new role_1.Role('');
                }
                AddRoleComponent = __decorate([
                    core_1.Component({
                        selector: 'add-roles',
                        templateUrl: 'app/html/add-role.component.html',
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return is_admin_1.isAdmin(next, previous);
                    }), 
                    __metadata('design:paramtypes', [role_service_1.RoleService, logger_service_1.Logger])
                ], AddRoleComponent);
                return AddRoleComponent;
            }());
            exports_1("AddRoleComponent", AddRoleComponent);
        }
    }
});
//# sourceMappingURL=add.component.js.map