import {Injectable} from 'angular2/core';

@Injectable()
export class Config {
    constructor() { }
    apiEndpoint = 'http://localhost:8080/api';
}