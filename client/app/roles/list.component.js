System.register(['angular2/core', '../services/authentication.service', '../services/logger.service', '../helpers/is-admin', '../services/role.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, authentication_service_1, logger_service_1, is_admin_1, role_service_1, router_1;
    var ListRolesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
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
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ListRolesComponent = (function () {
                function ListRolesComponent(_service, _logger, _router, _auth) {
                    this._service = _service;
                    this._logger = _logger;
                    this._router = _router;
                    this._auth = _auth;
                    this.loadRoles = function () {
                        var _this = this;
                        this._service.getRoles()
                            .subscribe(function (doc) {
                            _this.roles = doc.data;
                        }, function (err) { }, function () { });
                    };
                    this.editRole = function (id) {
                        this._router.navigate(['../EditRole', { id: id }]);
                    };
                    this.deleteRole = function (id) {
                        var _this = this;
                        // Delete user by id.
                        this._service.deleteRole(id)
                            .subscribe(function (doc) {
                            if (!doc.error) {
                                _this._logger.log('Deleted role ' + id);
                                _this.loadRoles();
                            }
                            else {
                                _this._logger.log('Unable to delete role ' + id);
                            }
                        }, function (err) { return _this._logger.log('Unable to delete role ' + id); });
                    };
                    this.addRole = function () {
                        this._router.navigate(['../AddRole']);
                    };
                    this._logger.log('Configuring role list.');
                    this.loadRoles();
                }
                ListRolesComponent = __decorate([
                    core_1.Component({
                        selector: 'list-roles',
                        templateUrl: 'app/html/list-roles.component.html',
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return is_admin_1.isAdmin(next, previous);
                    }), 
                    __metadata('design:paramtypes', [role_service_1.RoleService, logger_service_1.Logger, router_1.Router, authentication_service_1.Authentication])
                ], ListRolesComponent);
                return ListRolesComponent;
            }());
            exports_1("ListRolesComponent", ListRolesComponent);
        }
    }
});
//# sourceMappingURL=list.component.js.map