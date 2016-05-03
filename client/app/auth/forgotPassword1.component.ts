import {Component} from 'angular2/core';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { Authentication } from '../services/authentication.service';
import {NgClass, NgForm} from 'angular2/common';
import {User} from '../models/user';
import { Router, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'forgotPassword',
    templateUrl: 'app/html/forgot-password-1.component.html'
})

export class ForgotPasswordComponent1 {
    model:User;
    errors:Array<String>;
    constructor(
        private _authService:Authentication,
        private _logger:Logger,
        private _router:Router
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
        this.verifyAccount(model.email)
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
    verifyAccount = function (email) {
        this._logger.log(email);
        return this._authService.verifyResetPassword(email);
    }
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    }
} 