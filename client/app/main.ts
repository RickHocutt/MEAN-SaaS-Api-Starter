import {bootstrap}      from 'angular2/platform/browser';
import {provide, ComponentRef} from 'angular2/core';
import {appInjector} from './helpers/app-injector';
import {AppComponent}   from './app.component';
import {Authentication} from './services/authentication.service';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { Config } from './config';
import { Logger } from './services/logger.service';
import { 
    Router,
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy,
    ROUTER_BINDINGS
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';


bootstrap(AppComponent, [
    Config,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS,
    Authentication,
    Logger,
    UserService,
    RoleService
]).then((AppComponent:ComponentRef) => {
    // store a reference to the injector
    appInjector(AppComponent.injector);
});