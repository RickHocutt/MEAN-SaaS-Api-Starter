import {appInjector} from './app-injector';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of'; // May change to /rxjs/add/observable/of https://github.com/ReactiveX/RxJS/issues/1113
import { Injector} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import {Logger} from '../services/logger.service';
import {
    Router,
    ComponentInstruction
} from 'angular2/router';

export const isAdmin = (next: ComponentInstruction, previous: ComponentInstruction) => {
	let injector: Injector = appInjector(); // get the stored reference to the injector
	let auth: Authentication = injector.get(Authentication);
	let router: Router = injector.get(Router);
    let logger: Logger = injector.get(Logger);
    
    //return a boolean or a promise that resolves a boolean
	return new Promise((resolve) => {
        logger.log('Is admin? ' + auth.admin)
        if (!auth.admin) router.navigate(['Home']);
        resolve(auth.admin);
        
    });
};