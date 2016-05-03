System.register(['angular2/core', '../services/logger.service', '../services/user.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, logger_service_1, user_service_1, router_1;
    var ConfirmUserComponent;
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
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ConfirmUserComponent = (function () {
                function ConfirmUserComponent(_userService, _logger, _params) {
                    var _this = this;
                    this._userService = _userService;
                    this._logger = _logger;
                    this._params = _params;
                    this.token = this._params.get('token');
                    this._userService.confirmUser(this.token)
                        .subscribe(function (doc) {
                        if (doc.error)
                            _this.error = true;
                        else
                            _this.success = doc.data && doc.data.success;
                    }, function (err) { }, function () { });
                }
                ;
                ConfirmUserComponent = __decorate([
                    core_1.Component({
                        selector: 'confirmuser',
                        templateUrl: 'app/html/confirm-user.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger, router_1.RouteParams])
                ], ConfirmUserComponent);
                return ConfirmUserComponent;
            }());
            exports_1("ConfirmUserComponent", ConfirmUserComponent);
        }
    }
});
//# sourceMappingURL=confirmUser.component.js.map