import {Component} from 'angular2/core';
import { Authentication } from './services/authentication.service';
import { Logger } from './services/logger.service';
import { isLoggedIn } from './helpers/is-loggedin';
import { UserService } from './services/user.service';
import { User } from './models/user';
import {Router, CanActivate} from 'angular2/router';
@Component({
  selector: 'profile',
  templateUrl: 'app/html/profile.component.html'
})

@CanActivate(() => isLoggedIn())
export class ProfileComponent {
    user:User;
    constructor(
        private _userService:UserService,
        private _logger:Logger,
        private _router:Router
    ){
        this.user = new User('','');
        this._userService.getCurrentUser()
        .subscribe(
            (doc) => {
                this.user = doc.user;
            },
            err => {},
            () => {}
        );
    }
    
    editUser = function (id) {
        this._router.navigate(['/Users/EditUser', {id: id}]);
    };
    
} 