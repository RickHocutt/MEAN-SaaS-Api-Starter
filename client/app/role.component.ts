import {Component} from 'angular2/core';
import { Authentication } from './services/authentication.service';
import { Logger } from './services/logger.service';
import {AddRoleComponent} from './roles/add.component';
import {EditRoleComponent} from './roles/edit.component';
import {ListRolesComponent} from './roles/list.component';
import {Router, RouteConfig, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'role',
    templateUrl: 'app/html/role.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    { path:'/add', name: 'AddRole', component: AddRoleComponent },
    { path:'/:id', name: 'EditRole', component: EditRoleComponent },
    { path:'/list', name: 'ListRoles', component: ListRolesComponent, useAsDefault: true }
])

export class RoleComponent {
} 