import {Component} from 'angular2/core';
import {NgClass, NgForm} from 'angular2/common';
import {User} from '../models/user';
import { Authentication } from '../services/authentication.service';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import {Logger} from '../services/logger.service';
@Component({
  selector: 'login-form',
  templateUrl: 'app/html/login-form.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        NgClass
    ]
})
export class LoginFormComponent {
    model:User
    submitted:boolean;
    constructor(private _auth: Authentication, private _router: Router, private _logger:Logger) { 
        this.model = new User('','');
        this.submitted = false;
    }
    error = false;
    login = function () {
        this._logger.log('Logging in ...')
        this.submitted = true;
        this.error = false;
        this._auth.login(this.model)
            .subscribe(
                data => {
                    if (data.error) { 
                        this.error = true;
                        this._logger.log('Not a valid user.');
                    } 
                    else {
                        console.log(data)
                        if (data.user && data.user.confirmed){
                            this.goHome();
                        } else {
                            this.goNotConfirmed();
                        }
                    }
                },
                err => { this._logger.log('Error: ' +  JSON.stringify(err)); },
                () => {
                    this._logger.log('Login Request Complete');
                    this.submitted = false;
                }
            );
    }
    
    goHome = function () {
        let link = ['/Home'];
        this._router.navigate(link);
    }
    
    goNotConfirmed = function () {
        let link = ['/NotConfirmed'];
        this._router.navigate(link);
    }
} 