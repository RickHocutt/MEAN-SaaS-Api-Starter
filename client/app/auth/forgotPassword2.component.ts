import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { UserService } from '../services/user.service';
import {NgClass, NgForm} from 'angular2/common';
import {User} from '../models/user';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
    selector: 'forgotPassword',
    templateUrl: 'app/html/forgot-password-2.component.html',
    directives:[ROUTER_DIRECTIVES]
})

export class ForgotPasswordComponent2 {
    model:Object;
    token:String;
    errors:Array<String>;
    constructor(
        private _auth:Authentication,
        private _logger:Logger,
        private _params:RouteParams
    ){
        this.token = this._params.get('token');
        this.model = {
            token: this.token,
            password: ''
        }
    }
    submitted = false;
    success = false;
    error = null;
    handleSubmit = function () {
        this.submitted = true;
        this.success = false;
        this.error = null;
        this.setPassword(this.model)
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
    setPassword = function (model) {
        this._logger.log(model.password + ' ' + model.token);
        return this._auth.verifyResetPassword(model.password, model.token);
    }
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    }
} 