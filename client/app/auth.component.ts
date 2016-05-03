import {Component} from 'angular2/core';
import { Authentication } from './services/authentication.service';
import { Logger } from './services/logger.service';
import { LoginFormComponent } from './auth/login-form.component';
import { RegisterComponent } from './auth/register.component';
import { ConfirmUserComponent } from './auth/confirmUser.component';
import { ForgotPasswordComponent2 } from './auth/forgotPassword2.component';
import { ForgotPasswordComponent1 } from './auth/forgotPassword1.component';
import { User } from './models/user';
import {Router, RouteConfig, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'auth',
    templateUrl: 'app/html/auth.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})
@RouteConfig([
    { path:'/login', name: 'Login', component: LoginFormComponent },
    { path:'/register', name: 'Register', component: RegisterComponent },
    { path:'/confirm-user/:token', component: ConfirmUserComponent, as: 'Confirm' },
    { path:'/forgot-password2/:token', component: ForgotPasswordComponent2, as: 'ForgotPassword' },
    { path:'/forgot-password1/', component: ForgotPasswordComponent1, as: 'LookupAccountPassword' }
])

export class AuthComponent {
} 