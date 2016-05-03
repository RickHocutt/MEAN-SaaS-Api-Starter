System.register(['angular2/core', './services/logger.service', './helpers/is-loggedin', './services/user.service', './models/user', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, logger_service_1, is_loggedin_1, user_service_1, user_1, router_1;
    var ProfileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (is_loggedin_1_1) {
                is_loggedin_1 = is_loggedin_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ProfileComponent = (function () {
                function ProfileComponent(_userService, _logger, _router) {
                    var _this = this;
                    this._userService = _userService;
                    this._logger = _logger;
                    this._router = _router;
                    this.editUser = function (id) {
                        this._router.navigate(['/Users/EditUser', { id: id }]);
                    };
                    this.user = new user_1.User('', '');
                    this._userService.getCurrentUser()
                        .subscribe(function (doc) {
                        _this.user = doc.user;
                    }, function (err) { }, function () { });
                }
                ProfileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: 'app/html/profile.component.html'
                    }),
                    router_1.CanActivate(function () { return is_loggedin_1.isLoggedIn(); }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, logger_service_1.Logger, router_1.Router])
                ], ProfileComponent);
                return ProfileComponent;
            }());
            exports_1("ProfileComponent", ProfileComponent);
        }
    }
});
//# sourceMappingURL=profile.component.js.map