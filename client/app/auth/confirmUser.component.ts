import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isLoggedIn } from '../helpers/is-loggedin';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';
@Component({
  selector: 'confirmuser',
  templateUrl: 'app/html/confirm-user.component.html', 
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class ConfirmUserComponent {
    token:String;
    success:Boolean;
    error:Boolean;
    constructor(
        private _userService:UserService,
        private _logger:Logger,
        private _params:RouteParams
    ){
        this.token = this._params.get('token');
        this._userService.confirmUser(this.token)
            .subscribe(
                (doc) => {
                    if (doc.error) this.error = true
                    else 
                        this.success = doc.data && doc.data.success;
                },
                err => {},
                () => {}
            );
    };
} 