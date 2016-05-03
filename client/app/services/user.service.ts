import {User} from '../models/user';
import {Injectable} from 'angular2/core';
import {Logger} from './logger.service';
import {Http, Headers} from 'angular2/http';
import {Authentication} from './authentication.service';
import {Config} from '../config';

@Injectable()
export class UserService {
    constructor(
        private _logger: Logger,
        private _http: Http,
        private _auth: Authentication,
        private _config: Config
    ) { }
    /* Get user data from valid token at /api/currentuser */
    getCurrentUser() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._config.apiEndpoint + '/currentuser', { // All hosts to config.
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken()
            })
        }).map((res) => {
            let doc = res.json();
            let user = doc.data;
            return user;
        });
    }
    getUsers() {
        this._logger.log('Getting list of users.')
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._config.apiEndpoint + '/user', {
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken()
            })
        }).map((res) => {
            let doc = res.json();
            let users = doc.data;
            return users;
        });
    }
    getUser(id) {
        this._logger.log('Getting user ' + id);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._config.apiEndpoint + '/user/' + id, {
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken()
            })
        }).map((res) => {
            let doc = res.json();
            let user = doc.data;
            return user;
        });
    }
    addUser(user) {
        this._logger.log('Adding a user.');
        return this._http.post(this._config.apiEndpoint + '/user', JSON.stringify(user), {
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken(),
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            return doc;
        });
    }
    register(user) {
        this._logger.log('Adding a user.');
        return this._http.post(this._config.apiEndpoint + '/register', JSON.stringify(user), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            return doc;
        });
    }
    updateUser(user) {
        this._logger.log('Updating a user.');
        return this._http.put(this._config.apiEndpoint + '/user/' + user._id, JSON.stringify(user), {
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken(),
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            return doc;
        });
    }
    /* Not a secured route */
    confirmUser(token) {
        this._logger.log('Confirming a user.');
        return this._http.put(this._config.apiEndpoint + '/user/confirm/' + token, JSON.stringify({data: {message: 'Confirming user account.'}}), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            return doc;
        });
    }
    deleteUser(id) {
        this._logger.log('Deleting a user.');
        return this._http.delete(this._config.apiEndpoint + '/user/' + id, {
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken(),
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            return doc;
        });
    }
}