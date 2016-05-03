System.register(['angular2/core', '../services/authentication.service', '../services/logger.service', '../helpers/is-admin', '../services/user.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, authentication_service_1, logger_service_1, is_admin_1, user_service_1, router_1;
    var ListComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ListComponent = (function () {
                function ListComponent(_userService, _logger, _router, _auth) {
                    this._userService = _userService;
                    this._logger = _logger;
                    this._router = _router;
                    this._auth = _auth;
                    this.loadUsers = function () {
                        var _this = this;
                        this._userService.getUsers()
                            .subscribe(function (doc) {
                            _this.users = doc;
                        }, function (err) { }, function () { });
                    };
                    this.editUser = function (id) {
                        this._router.navigate(['EditUser', { id: id }]);
                    };
                    this.deleteUser = function (id) {
                        var _this = this;
                        // Delete user by id.
                        this._userService.deleteUser(id)
                            .subscribe(function (doc) {
                            if (!doc.error) {
                                _this._logger.log('Deleted user ' + id);
                                _this.loadUsers();
                            }
                            else {
                                _this._logger.log('Unaable to delete user ' + id);
                            }
                        }, function (err) { return _this._logger.log('Unaable to delete user ' + id); });
                    };
                    this.addUser = function () {
                        this._router.navigate(['AddUser']);
                    };
                    this._logger.log('Configuring user list.');
                    this.loadUsers();
                    this.currentUser = this._auth.user;
                }
                ListComponent = __decorate([
                    core_1.Component({
                        selector: 'listUsers',
                        templateUrl: 'app/html/list-users.component.html',
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return is_admin_1.isAdmin(next, previous);
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger, router_1.Router, authentication_service_1.Authentication])
                ], ListComponent);
                return ListComponent;
            }());
            exports_1("ListComponent", ListComponent);
        }
    }
});
//# sourceMappingURL=list.component.js.map