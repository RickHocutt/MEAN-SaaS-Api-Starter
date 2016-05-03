System.register(['angular2/core', '../services/authentication.service', '../services/logger.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, authentication_service_1, logger_service_1, router_1;
    var ForgotPasswordComponent2;
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
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ForgotPasswordComponent2 = (function () {
                function ForgotPasswordComponent2(_auth, _logger, _params) {
                    this._auth = _auth;
                    this._logger = _logger;
                    this._params = _params;
                    this.submitted = false;
                    this.success = false;
                    this.error = null;
                    this.handleSubmit = function () {
                        var _this = this;
                        this.submitted = true;
                        this.success = false;
                        this.error = null;
                        this.setPassword(this.model)
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
                    this.setPassword = function (model) {
                        this._logger.log(model.password + ' ' + model.token);
                        return this._auth.verifyResetPassword(model.password, model.token);
                    };
                    this.diagnostic = function (obj) {
                        return JSON.stringify(obj);
                    };
                    this.token = this._params.get('token');
                    this.model = {
                        token: this.token,
                        password: ''
                    };
                }
                ForgotPasswordComponent2 = __decorate([
                    core_1.Component({
                        selector: 'forgotPassword',
                        templateUrl: 'app/html/forgot-password-2.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [authentication_service_1.Authentication, logger_service_1.Logger, router_1.RouteParams])
                ], ForgotPasswordComponent2);
                return ForgotPasswordComponent2;
            }());
            exports_1("ForgotPasswordComponent2", ForgotPasswordComponent2);
        }
    }
});
//# sourceMappingURL=forgotPassword2.component.js.map