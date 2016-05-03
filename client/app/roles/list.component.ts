import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role';
import {Router, RouteConfig, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'list-roles',
    templateUrl: 'app/html/list-roles.component.html',
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isAdmin(next, previous);
})

export class ListRolesComponent {
    roles:Array<Role>;
    constructor(
        private _service:RoleService,
        private _logger:Logger,
        private _router:Router,
        private _auth:Authentication
    ){ 
        this._logger.log('Configuring role list.');
        this.loadRoles();
    }
    loadRoles = function () {
        this._service.getRoles()
        .subscribe(
            (doc) => {
                this.roles = doc.data;
            },
            err => {},
            () => {}
        );
    };
    editRole = function (id) {
        this._router.navigate(['../EditRole', {id: id}]);
    };
    deleteRole = function (id) {
        // Delete user by id.
        this._service.deleteRole(id)
        .subscribe(
                (doc) => {
                    if (!doc.error) {
                        this._logger.log('Deleted role ' + id);
                        this.loadRoles();
                    } else {
                        this._logger.log('Unable to delete role ' + id)
                    }
                },
                (err) => this._logger.log('Unable to delete role ' + id)
            );
    };
    addRole = function () {
        this._router.navigate(['../AddRole']);
    };
} 