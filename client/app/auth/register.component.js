System.register(['angular2/core', '../services/logger.service', '../services/user.service', '../models/user'], function(exports_1, context_1) {
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
    var core_1, logger_service_1, user_service_1, user_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_userService, _logger) {
                    this._userService = _userService;
                    this._logger = _logger;
                    this.submitted = false;
                    this.success = false;
                    this.error = null;
                    this.handleSubmit = function (model) {
                        var _this = this;
                        this.submitted = true;
                        this.success = false;
                        this.error = null;
                        this.addUser(model)
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
                    this.addUser = function (user) {
                        this._logger.log(user);
                        return this._userService.register(user);
                    };
                    this.diagnostic = function (obj) {
                        return JSON.stringify(obj);
                    };
                    this.model = new user_1.User('', '');
                }
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'registerUser',
                        templateUrl: 'app/html/register-user.component.html',
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map