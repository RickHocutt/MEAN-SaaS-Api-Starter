import {Component} from 'angular2/core';
import { Authentication } from './services/authentication.service';
import { Logger } from './services/logger.service';
import { isAdmin } from './helpers/is-admin';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { EditComponent } from './users/edit.component';
import { ListComponent } from './users/list.component';
import { AddComponent } from './users/add.component';
import {Router, RouteConfig, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'users',
    templateUrl: 'app/html/users.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    { path:'/:id',      name: 'EditUser',   component: EditComponent},
    { path:'/add',      name: 'AddUser',   component: AddComponent},
    { path:'/list',      name: 'ListUsers',   component: ListComponent, useAsDefault: true}
])

export class UsersComponent {
} 