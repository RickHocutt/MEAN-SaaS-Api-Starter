import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {Router, RouteConfig, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'listUsers',
    templateUrl: 'app/html/list-users.component.html',
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isAdmin(next, previous);
})

export class ListComponent {
    users:Array<User>;
    currentUser:User;
    constructor(
        private _userService:UserService,
        private _logger:Logger,
        private _router:Router,
        private _auth:Authentication
    ){ 
        this._logger.log('Configuring user list.');
        this.loadUsers();
        this.currentUser = this._auth.user;
    }
    loadUsers = function () {
        this._userService.getUsers()
        .subscribe(
            (doc) => {
                this.users = doc;
            },
            err => {},
            () => {}
        );
    };
    editUser = function (id) {
        this._router.navigate(['EditUser', {id: id}]);
    };
    deleteUser = function (id) {
        // Delete user by id.
        this._userService.deleteUser(id)
        .subscribe(
                (doc) => {
                    if (!doc.error) {
                        this._logger.log('Deleted user ' + id);
                        this.loadUsers();
                    } else {
                        this._logger.log('Unaable to delete user ' + id)
                    }
                },
                (err) => this._logger.log('Unaable to delete user ' + id)
            );
    };
    addUser = function () {
        this._router.navigate(['AddUser']);
    };
} 