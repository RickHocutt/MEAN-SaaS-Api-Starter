System.register(['angular2/core', 'angular2/common', '../services/authentication.service', '../services/logger.service', '../helpers/is-admin', '../services/user.service', '../services/role.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, common_1, authentication_service_1, logger_service_1, is_admin_1, user_service_1, role_service_1, router_1;
    var AddComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
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
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AddComponent = (function () {
                function AddComponent(_userService, _roleService, _logger, _params, _auth, _router, _fb, _changeDetector) {
                    var _this = this;
                    this._userService = _userService;
                    this._roleService = _roleService;
                    this._logger = _logger;
                    this._params = _params;
                    this._auth = _auth;
                    this._router = _router;
                    this._fb = _fb;
                    this._changeDetector = _changeDetector;
                    this.initForm = function () {
                        _this.addUserForm = _this._fb.group({
                            username: ['', common_1.Validators.required],
                            email: ['', common_1.Validators.required],
                            fname: ['', common_1.Validators.required],
                            lname: ['', common_1.Validators.required],
                            passwords: _this._fb.group({
                                password: [''],
                                verifyPassword: ['']
                            }, { validator: _this.areEqual })
                        });
                        _this.lname = _this.addUserForm.controls['lname'];
                        _this.fname = _this.addUserForm.controls['fname'];
                        _this.username = _this.addUserForm.controls['username'];
                        _this.passwords = _this.addUserForm.controls['passwords'];
                        _this.email = _this.addUserForm.controls['email'];
                        _this.initRoles();
                    };
                    this.initRoles = function () {
                        _this._roleService.getRoles()
                            .subscribe(function (doc) {
                            if (!doc.error) {
                                _this.availableRoles = doc.data;
                            }
                            else {
                                _this.setErrorMessages(doc.error);
                            }
                        }, function (err) { return _this.setErrorMessages({ error: 'Failed to retrieve roles.' }); });
                    };
                    this.areEqual = function (group) {
                        var valid = false;
                        var val = '';
                        for (name in group.controls) {
                            if (val.length == 0) {
                                val = group.controls[name].value;
                            }
                            else {
                                if (val == group.controls[name].value) {
                                    valid = true;
                                }
                            }
                        }
                        return valid ? null : { invalidAreEqual: true };
                    };
                    this.submitted = false;
                    this.success = false;
                    this.error = null;
                    this.handleSubmit = function () {
                        var model = {
                            username: _this.username.value,
                            email: _this.email.value,
                            fname: _this.fname.value,
                            lname: _this.lname.value,
                            roles: _this.roles,
                            password: _this.passwords.value.password
                        };
                        _this.submitted = true;
                        _this.success = false;
                        _this.error = null;
                        _this.addUser(model)
                            .subscribe(function (doc) {
                            if (!doc.error) {
                                _this.success = true;
                                _this.error = false;
                            }
                            else {
                                _this.success = false;
                                _this.error = true;
                                _this.setErrorMessages(doc.error, doc.message);
                            }
                        }, function (err) { return _this.success = false; }, function () { return _this.submitted = false; });
                    };
                    this.setErrorMessages = function (err, message) {
                        var errors = err.errors;
                        _this.errors = [];
                        _this.errors.push(message);
                        if (err['errmsg'])
                            _this.errors.push(err['errmsg']);
                        for (var prop in errors) {
                            if (errors[prop] && errors[prop].message) {
                                _this.errors.push(errors[prop].message);
                            }
                        }
                    };
                    this.updateRoles = function (role, checked) {
                        if (checked) {
                            _this.roles.push(role);
                        }
                        else {
                            var index = _this.roleIndex(role);
                            if (index > -1) {
                                _this.roles.splice(index, 1);
                            }
                        }
                    };
                    this.roleAlreadyAdded = function (role) {
                        for (var _i = 0, _a = _this.roles; _i < _a.length; _i++) {
                            var r = _a[_i];
                            if (r._id === role._id)
                                return true;
                        }
                    };
                    this.roleIndex = function (role) {
                        var i = 0;
                        for (var _i = 0, _a = _this.roles; _i < _a.length; _i++) {
                            var r = _a[_i];
                            if (r._id === role._id) {
                                return i;
                            }
                            i++;
                        }
                    };
                    this.addUser = function (user) {
                        this._logger.log(user);
                        return this._userService.addUser(user);
                    };
                    this.diagnostic = function (obj) {
                        return JSON.stringify(obj);
                    };
                    this.roles = [];
                    this.initForm();
                }
                AddComponent = __decorate([
                    core_1.Component({
                        selector: 'addUsers',
                        templateUrl: 'app/html/add-user.component.html',
                    }),
                    router_1.CanActivate(function (next, previous) {
                        return is_admin_1.isAdmin(next, previous);
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, role_service_1.RoleService, logger_service_1.Logger, router_1.RouteParams, authentication_service_1.Authentication, router_1.Router, common_1.FormBuilder, core_1.ChangeDetectorRef])
                ], AddComponent);
                return AddComponent;
            }());
            exports_1("AddComponent", AddComponent);
        }
    }
});
//# sourceMappingURL=add.component.js.map