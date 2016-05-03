import {Component} from 'angular2/core';
import { Authentication } from './services/authentication.service';
import { isLoggedIn } from './helpers/is-loggedin';
import {Router, OnActivate, ComponentInstruction, RouteParams} from 'angular2/router';
import {Logger} from './services/logger.service';
@Component({
  selector: 'loading',
  templateUrl: 'app/html/loading.component.html' 
})

export class LoadingComponent implements OnActivate {
    message = "Loading ...";
    redirectTo:any;
    constructor (private _logger:Logger, public auth:Authentication, private _router:Router, public params:RouteParams){
        this.redirectTo = params.get('redirectTo') ? params.get('redirectTo') : 'home';
     }
    goHome = function () {
        this._logger.log('Go home.');
        this.auth.isLoaded = true; 
        let link = ['Home'];
        this._router.navigate(link);
    };
    goNotConfirmed = function () {
        this._logger.log('Go not confirmed.');
        let link = ['NotConfirmed'];
        this._router.navigate(link);
    };
    logout = function () {
        this.auth.logout().subscribe(
            (res) => {
                this._logger.log('Logged out.');
            },
            (err) => {
                this._logger.log('Couldn\'t log out.');
            }
        );
    };
    routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return new Promise(resolve => {
            this._logger.log('Router activated.' + this.redirectTo.indexOf('/confirmUser/') + ' ' + this.redirectTo);
            if (this.redirectTo.indexOf('auth/') > -1) {
                this._logger.log('User or password is being confirmed.');
                resolve(true);
                this._router.navigateByUrl('/' + this.redirectTo);
            } else {
                this.auth.refresh()
                    .subscribe(
                        (res) => {
                            if (res.confirmed) {
                                this._logger.log('has user');
                                this._logger.log('redirectTo: ' + this.redirectTo);
                                resolve(true);
                                this._router.navigateByUrl('/' + this.redirectTo);
                            } else {
                                this._logger.log('User not confirmed.');
                                resolve(true);
                                this.goNotConfirmed();
                            }
                        },
                        (err) => {
                            this.logout();
                            resolve(true);
                            this.goHome();
                        }
                    );
            }
            
        });
    }
} 