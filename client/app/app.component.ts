import { Component } from 'angular2/core';
import { HomeComponent } from './home.component';
import { NotConfirmedComponent } from './notConfirmed.component';
import { LoadingComponent } from './loading.component';
import { UsersComponent } from './users.component';
import { AuthComponent } from './auth.component';
import { RoleComponent } from './role.component';
import { ProfileComponent } from './profile.component';
import { User } from './models/user';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ComponentInstruction} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import { isLoggedIn } from './helpers/is-loggedin';
import { Authentication } from './services/authentication.service';
import { Logger } from './services/logger.service';


@Component({
    selector: 'app',
    templateUrl: 'app/html/app.component.html', 
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    { path: '/', redirectTo: ['Home'] },
    { path:'/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path:'/profile', component: ProfileComponent, as: 'Profile' },
    { path:'/not-confirmed', component: NotConfirmedComponent, as: 'NotConfirmed' },
    { path:'/loading', component: LoadingComponent, as: 'Loading'},
    { path:'/users/...', component: UsersComponent, as: 'Users' },
    { path:'/auth/...', component: AuthComponent, as: 'Auth' },
    { path:'/roles/...', component: RoleComponent, as: 'Roles' }
])

export class AppComponent  {
    
    constructor (private router: Router, public auth: Authentication, private _logger: Logger) {
        if (!this.auth.isLoaded){
            this._logger.log('Not loaded yet...');
            let link = ['Loading', {'redirectTo': location.hash.split('#/')[1]}];
            this.router.navigate(link);
        }
    }
    
    isLoggedIn = isLoggedIn;
    title = 'Starter UI';
    logout = function () {
        this.auth.logout()
            .subscribe(
                () => { 
                    let link = ['Home'];
                    this.router.navigate(link);
                }
            );
    }
    goToProfile = function () {
        this.router.navigate(['Users/Profile']);
    }
    diagnostic = function () { return JSON.stringify(this.auth); }
}