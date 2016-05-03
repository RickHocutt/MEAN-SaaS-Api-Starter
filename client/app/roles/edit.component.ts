import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { RoleService } from '../services/role.service';
import {NgClass, NgForm} from 'angular2/common';
import {Role} from '../models/role';
import { RouteParams, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'edit-role',
    templateUrl: 'app/html/edit-role.component.html',
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isAdmin(next, previous);
})

export class EditRoleComponent {
    model:Role;
    roleId:String;
    errors:Array<String>;
    constructor(
        private _service:RoleService,
        private _logger:Logger,
        private _params:RouteParams
    ){ 
        this.model = new Role('');
        this.roleId = this._params.get('id');
        this._service.getRole(this.roleId)
                .subscribe(
                    (doc) => {
                        if (!doc.error) {
                            this._logger.log('Retrieved role ' + this.roleId);
                            this.model = doc.data;
                        } else {
                            this._logger.log('Unable to find user ' + this.roleId);
                        }
                    },
                    (err) => this._logger.log('Unable to find user ' + this.roleId)
                );
    }
    submitted = false;
    success = false;
    error = null;
    handleSubmit = function (model) {
        this.submitted = true;
        this.success = false;
        this.error = null;
        this.editRole(model)
            .subscribe(
                (doc) => {
                    if (!doc.error) {
                        this.success = true;
                        this.error = false;
                    } else {
                        this.success = false; 
                        this.error = true;
                        this.setErrorMessages(doc.error);
                    }
                },
                (err) => this.success = false,
                () => this.submitted = false
            );
    }
    setErrorMessages = function (errorObj) {
        var errors = errorObj.errors;
        this.errors = [];
        this.errors.push(errorObj.message);
        for (var prop in errors) {
            if (errors[prop] && errors[prop].message) {
                this.errors.push(errors[prop].message);
            }
        }
    }
    editRole = function (role) {
        this._logger.log(role);
        return this._service.editRole(role);
    }
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    }
} 