import {User} from '../models/user';
import {Injectable} from 'angular2/core';
import {Logger} from './logger.service';
import {Http, Headers} from 'angular2/http';
import {Authentication} from './authentication.service';
import {Config} from '../config';

@Injectable()
export class RoleService {
    constructor(
        private _logger: Logger,
        private _http: Http,
        private _auth: Authentication,
        private _config: Config
    ) { }
    /* Get user data from valid token at /api/role */
    getRoles() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._config.apiEndpoint + '/role', { // All hosts to config.
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken()
            })
        }).map((res) => {
            let doc = res.json();
            let roles = doc;
            return roles;
        });
    }
    getRole(id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(this._config.apiEndpoint + '/role/' + id, { // All hosts to config.
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken()
            })
        }).map((res) => {
            let doc = res.json();
            let role = doc;
            return role;
        });
    }
    editRole(role) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(this._config.apiEndpoint + '/role/' + role._id, JSON.stringify(role), { // All hosts to config.
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken(),
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            let roles = doc;
            return roles;
        });
    }
    deleteRole(id) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.delete(this._config.apiEndpoint + '/role/' + id, { // All hosts to config.
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken(),
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            let roles = doc;
            return roles;
        });
    }
    addRole(role) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._config.apiEndpoint + '/role', JSON.stringify(role), { // All hosts to config.
            headers: new Headers({
                'Authorization': 'Bearer ' + this._auth.getToken(),
                'Content-Type': 'application/json'
            })
        }).map((res) => {
            let doc = res.json();
            let roles = doc;
            return roles;
        });
    }
}