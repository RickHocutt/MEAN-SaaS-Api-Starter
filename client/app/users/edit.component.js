System.register(['angular2/core', 'angular2/common', '../services/authentication.service', '../services/logger.service', '../services/user.service', '../services/role.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, common_1, authentication_service_1, logger_service_1, user_service_1, role_service_1, router_1;
    var EditComponent;
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
            EditComponent = (function () {
                function EditComponent(_userService, _roleService, _logger, _params, _auth, _router, _fb, _changeDetector) {
                    var _this = this;
                    this._userService = _userService;
                    this._roleService = _roleService;
                    this._logger = _logger;
                    this._params = _params;
                    this._auth = _auth;
                    this._router = _router;
                    this._fb = _fb;
                    this._changeDetector = _changeDetector;
                    this.isAdmin = this._auth.admin;
                    this.currentUserIsAdmin = function () {
                        if (!_this.roles)
                            return false;
                        for (var i = 0; i < _this.roles.length; i++) {
                            if (_this.roles[i].label == 'admin')
                                return _this.isProfileEdit;
                        }
                        return false;
                    };
                    this.initForm = function () {
                        if (_this.editUserForm) {
                            _this.cachedUser.fname = _this.fname.value;
                            _this.cachedUser.lname = _this.lname.value;
                            _this.cachedUser.username = _this.username.value;
                            _this.cachedUser.email = _this.email.value;
                            delete _this.editUserForm;
                        }
                        _this.editUserForm = _this._fb.group({
                            username: ['', common_1.Validators.required],
                            email: ['', common_1.Validators.required],
                            fname: ['', common_1.Validators.required],
                            lname: ['', common_1.Validators.required],
                            passwords: _this._fb.group({
                                password: [''],
                                verifyPassword: ['']
                            }, { validator: _this.areEqual })
                        });
                        _this.lname = _this.editUserForm.controls['lname'];
                        _this.fname = _this.editUserForm.controls['fname'];
                        _this.username = _this.editUserForm.controls['username'];
                        _this.passwords = _this.editUserForm.controls['passwords'];
                        _this.email = _this.editUserForm.controls['email'];
                        _this.updateFormData();
                    };
                    this.updateFormData = function () {
                        var user = _this.cachedUser;
                        if (user) {
                            _this.fname.updateValue(user.fname);
                            _this.lname.updateValue(user.lname);
                            _this.email.updateValue(user.email);
                            _this.username.updateValue(user.username);
                            _this.roles = user.roles;
                        }
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
                        return valid || !_this.changingPassword ? null : { invalidAreEqual: true };
                    };
                    this.submitted = false;
                    this.success = false;
                    this.error = null;
                    this.updateUser = function (user) {
                        _this._logger.log(user);
                        return _this._userService.updateUser(user);
                    };
                    this.handleSubmit = function () {
                        var model = {
                            _id: _this.userId,
                            username: _this.username.value,
                            email: _this.email.value,
                            fname: _this.fname.value,
                            lname: _this.lname.value,
                            roles: _this.roles,
                            password: _this.passwords.value.password && _this.passwords.value.password.length ? _this.passwords.value.password : undefined
                        };
                        _this.submitted = true;
                        _this.success = false;
                        _this.error = null;
                        _this.updateUser(model)
                            .subscribe(function (doc) {
                            if (!doc.error) {
                                _this.success = true;
                                _this.error = false;
                                if (_this.isProfileEdit) {
                                    if (_this._auth.user) {
                                        Object.assign(_this._auth.user, model);
                                    }
                                }
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
                        _this.errors = [];
                        _this.errors.push(errorObj.message);
                        for (var prop in errors) {
                            if (errors[prop] && errors[prop].message) {
                                _this.errors.push(errors[prop].message);
                            }
                        }
                    };
                    this.changePassword = function () {
                        _this.changingPassword = true;
                        /*
                         * To learn why detectChanges() is called here, check out http://stackoverflow.com/questions/34827334/triggering-angular2-change-detection-manually
                         * and https://angular.io/docs/ts/latest/api/core/ChangeDetectorRef-class.html#!#detectChanges
                         */
                        _this._changeDetector.detectChanges();
                    };
                    this.cancelChangePassword = function () {
                        _this.changingPassword = false;
                        _this.initForm();
                    };
                    this.goToChangeRoles = function () {
                        _this.changingRoles = true;
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
                    this.diagnostic = function (obj) {
                        return JSON.stringify(obj);
                    };
                    this.selectedRoles = [];
                    this.initForm();
                    this.userId = this._params.get('id');
                    this.isProfileEdit = (this._auth.user && (this._auth.user._id === this.userId));
                    if (!this._auth.isAdmin && !this.isProfileEdit) {
                        this._router.navigate(['Home']);
                    }
                    this._logger.log(this.userId);
                    this._userService.getUser(this.userId)
                        .subscribe(function (doc) {
                        if (!doc.error) {
                            _this.cachedUser = doc.user;
                            _this.updateFormData();
                        }
                        else {
                            _this._logger.log('Unable to find user ' + _this.userId);
                        }
                    }, function (err) { return _this._logger.log('Unable to find user ' + _this.userId); });
                }
                EditComponent = __decorate([
                    core_1.Component({
                        selector: 'editUsers',
                        templateUrl: 'app/html/edit-user.component.html',
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, role_service_1.RoleService, logger_service_1.Logger, router_1.RouteParams, authentication_service_1.Authentication, router_1.Router, common_1.FormBuilder, core_1.ChangeDetectorRef])
                ], EditComponent);
                return EditComponent;
            }());
            exports_1("EditComponent", EditComponent);
        }
    }
});
//# sourceMappingURL=edit.component.js.map