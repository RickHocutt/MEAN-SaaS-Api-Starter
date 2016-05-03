import {Component} from 'angular2/core';
import {Authentication} from './services/authentication.service'
@Component({
  selector: 'not-confirmed',
  templateUrl: 'app/html/not-confirmed.component.html' 
})

export class NotConfirmedComponent {
    /**
     *
     */
    constructor(private _auth:Authentication) {
        this._auth.logout()
        .subscribe();
    }
    message = "Check your email to confirm your account.";
} 