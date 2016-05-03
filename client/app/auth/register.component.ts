import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { UserService } from '../services/user.service';
import {NgClass, NgForm} from 'angular2/common';
import {User} from '../models/user';
import { CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'registerUser',
    templateUrl: 'app/html/register-user.component.html',
})

export class RegisterComponent {
    model:User;
    errors:Array<String>;
    constructor(
        private _userService:UserService,
        private _logger:Logger
    ){ 
        this.model = new User('','');
    }
    submitted = false;
    success = false;
    error = null;
    handleSubmit = function (model) {
        this.submitted = true;
        this.success = false;
        this.error = null;
        this.addUser(model)
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
    addUser = function (user) {
        this._logger.log(user);
        return this._userService.register(user);
    }
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    }
} 