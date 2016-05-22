import {Component} from 'angular2/core';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { UserService } from '../services/user.service';
import {NgClass, NgForm} from 'angular2/common';
import {User} from '../models/user';
import { CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'registerUser',
    templateUrl: 'app/html/register-user.component.html',
})

export class RegisterComponent {
    model:User;
    card:any;
    errors:Array<String>;
    months:Array<any>;
    years:Array<number>;
    constructor(
        private _userService:UserService,
        private _logger:Logger
    ){ 
        this.card = {};
        this.model = new User('','');
        this.months = [
        {id: 1, name: 'January'},
        {id: 2, name: 'February'},
        {id: 3, name: 'March'},
        {id: 4, name: 'April'},
        {id: 5, name: 'May'},
        {id: 6, name: 'June'},
        {id: 7, name: 'July'},
        {id: 8, name: 'August'},
        {id: 9, name: 'September'},
        {id: 10, name: 'October'},
        {id: 11, name: 'November'},
        {id: 12, name: 'December'}
    ];
    this.years = [
        2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030
    ]
    this.card.expiry_month = this.months[0];
    this.card.expiry_year = this.years[0];
    }
    submitted = false;
    success = false;
    error = null;

    handleSubmit = function (model) {
        this.submitted = true;
        this.success = false;
        this.error = null;
        this.addUser(model)
            .subscribe(
                (doc) => {
                    if (!doc.error) {
                        this.success = true;
                        this.error = false;
                    } else {
                        this.success = false; 
                        this.error = true;
                        this.setErrorMessages(doc.error);
                    }
                },
                (err) => this.success = false,
                () => this.submitted = false
            );
    }
    setErrorMessages = function (errorObj) {
        var errors = errorObj.errors;
        this.errors = [];
        this.errors.push(errorObj.message);
        for (var prop in errors) {
            if (errors[prop] && errors[prop].message) {
                this.errors.push(errors[prop].message);
            }
        }
    }
    addUser = function (user) {
        this._logger.log(user);
        return this._userService.register(user);
    }
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    }
} 
/*onSubmit(form):void{ 
    this.form = form;
    this.clearError();
    if(form.valid){
        this.waiting = true;
        Stripe.card.createToken({
            number: form.value.card_number,
            cvc: form.value.card_cvc,
            exp_month: form.value.card_expiry_month,
            exp_year: form.value.card_expiry_year
        }, this.stripeResponseHandler.bind(this));
    }
}

stripeResponseHandler(status, response):void {
    if (response.error) {
        this.error = 'The card provided is not valid:' + response.error.message;
    } else {
        // response contains id and card, which contains additional card details
        var token = response.id;
        // reset the error
        const data = {
            whatever: this.form.value.whatever,
            stripeToken: token
        };
        this._httpService.enrollCourse(data)
            .subscribe(
                data => this.handleSuccess(data, this.form),
                error => this.handleError(error)
        )
    }
};*/