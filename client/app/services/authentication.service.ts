import {Injectable} from 'angular2/core';
import {Http, Headers, Request, RequestMethod, RequestOptions} from 'angular2/http';
import {User} from '../models/user';
import {Role} from '../models/role';
import {Observable} from 'rxjs/Observable';
import {Logger} from './logger.service';
import 'rxjs/add/observable/of'; // May change to /rxjs/add/observable/of https://github.com/ReactiveX/RxJS/issues/1113
import {Config} from '../config';

@Injectable()
export class Authentication {
    public user:User;
    constructor(
        private _logger:Logger, 
        private _http: Http,
        private _config: Config
    ) {}
    isLoaded = false;
    token = this.getToken();
    admin:Boolean;
    private _setAdmin = function () {
        var roles = this.user ? this.user.roles : null;
        this.admin = false;
        if (roles)
            for(var i=0; i < roles.length; i++) {
                if (roles[i].label === 'admin') {
                    this.admin = true;
                }
            }
    }
    public isAdmin = function () {
        var options = new RequestOptions({
            method: RequestMethod.Get,
            url: this._config.apiEndpoint + '/isadmin',
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.getToken()
            })
        });
        var request = new Request(options);
        return this._http.request(request)
            .map((res) => {
                return res.json();
            }
        );
    }
    public getToken () {
        return localStorage.getItem('id_token') || '';
    }
    public refresh() {
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this._config.apiEndpoint + '/auth/refresh', // Move to config.
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.getToken()
            }),
            body: '{ "message": "Refreshing user token." }'
        });
        var request = new Request(options);
        return this._http.request(request)
            .map(res => {
                let doc = res.json();
                if (doc && doc.data && doc.data.token && doc.data.user) {
                    this._setCachedToken(doc.data.token);
                    this.user = doc.data.user;
                    this._setAdmin();
                    return this.user;
                } else {
                    this.logout();
                    this._setAdmin();
                }
            })
    }
    public login(user: User) {
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: this._config.apiEndpoint + '/auth/login',
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.getToken()
            }),
            body: JSON.stringify(user)
        });
        var request = new Request(options);
        return this._http.request(request)
            .map((res) => {
                let doc = res.json();
                if (doc && doc.data && doc.data.token && doc.data.user) {
                    this._setCachedToken(doc.data.token);
                    this.user = doc.data.user;
                    this._setAdmin();
                    return doc.data;
                } else {
                    this._setAdmin();
                    return { 'error': doc.error, 'message': doc.message };
                }
            }
        );
    }
    private _setCachedToken = function (token) {
        localStorage.setItem('id_token', token);
    };
    private _clearCachedToken = function () {
        localStorage.removeItem('id_token');
    };
    public logout() {
        var options = new RequestOptions({
            method: RequestMethod.Get,
            url: this._config.apiEndpoint + '/auth/logout',
            headers: new Headers({
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.getToken()
            })
        });
        var request = new Request(options);
        return this._http.request(request)
            .map((res) => {
                this._clearCachedToken();
                this.user = undefined;
                return res.json();
            }
        )
    }
    public verifyResetPassword(str, token) {
        var options = new RequestOptions({
            method: RequestMethod.Post,
            url: token ? this._config.apiEndpoint + '/auth/password-reset' : this._config.apiEndpoint + '/auth/verify-password-reset',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: token ? JSON.stringify({password: str, token:token}): JSON.stringify({email:str})
        });
        var request = new Request(options);
        if (str || token){
            return this._http.request(request)
                .map((res) => {
                    let doc = res.json();
                    return doc;
                });
        } else {
            return Observable.of({error: 'Invalid parameter: email, password or token'});
        }
    }
}