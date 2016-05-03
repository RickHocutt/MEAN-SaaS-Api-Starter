import {Component, ChangeDetectorRef} from 'angular2/core';
import {Validators, ControlGroup, Control, ControlArray, FormBuilder, AbstractControl} from 'angular2/common';
import { Authentication } from '../services/authentication.service';
import { Logger } from '../services/logger.service';
import { isAdmin } from '../helpers/is-admin';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Router, RouteParams, CanActivate, ComponentInstruction} from 'angular2/router';

@Component({
    selector: 'addUsers',
    templateUrl: 'app/html/add-user.component.html',
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isAdmin(next, previous);
})
export class AddComponent {
    username:AbstractControl;
    fname:AbstractControl;
    lname:AbstractControl;
    passwords:AbstractControl;
    roles:Array<Role>;
    email:AbstractControl;
    addUserForm:ControlGroup;
    availableRoles:Array<Role>;
    errors:Array<string>;
    changingPassword:Boolean;
    changingRoles:Boolean;
    constructor(
        private _userService:UserService,
        private _roleService:RoleService,
        private _logger:Logger,
        private _params:RouteParams,
        private _auth:Authentication,
        private _router:Router,
        private _fb:FormBuilder,
        private _changeDetector:ChangeDetectorRef
        ){ 
            this.roles = [];
            this.initForm();
        }
    initForm = () => {
        this.addUserForm = this._fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            passwords: this._fb.group({
                password: [''],
                verifyPassword: ['']
            }, {validator: this.areEqual})
        });
        this.lname = this.addUserForm.controls['lname'];
        this.fname = this.addUserForm.controls['fname'];
        this.username = this.addUserForm.controls['username'];
        this.passwords = this.addUserForm.controls['passwords'];
        this.email = this.addUserForm.controls['email'];
        this.initRoles();
    };
    initRoles = () => {
        this._roleService.getRoles()
            .subscribe(
                (doc) => {
                    if (!doc.error) {
                        this.availableRoles = doc.data;
                    } else {
                        this.setErrorMessages(doc.error);
                    }
                },
                (err) => this.setErrorMessages({error: 'Failed to retrieve roles.'})
            );
    }
    areEqual = (group:ControlGroup) => {
        let valid = false;
        let val = '';
        for (name in group.controls) {
            if (val.length == 0) {
                val = group.controls[name].value;
            } else {
                if (val == group.controls[name].value) {
                    valid = true;
                }
            }
        }
        return valid ? null : { invalidAreEqual: true };
    };
    submitted = false;
    success = false;
    error = null;
    handleSubmit = () => {
        let model = {
            username: this.username.value,
            email: this.email.value,
            fname: this.fname.value,
            lname: this.lname.value,
            roles: this.roles,
            password: this.passwords.value.password
        }
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
                        this.setErrorMessages(doc.error, doc.message);
                    }
                },
                (err) => this.success = false,
                () => this.submitted = false
            );
    };
    setErrorMessages = (err, message) => {
        let errors = err.errors;
        this.errors = [];
        this.errors.push(message);
        if (err['errmsg']) this.errors.push(err['errmsg']);
        for (var prop in errors) {
            if (errors[prop] && errors[prop].message) {
                this.errors.push(errors[prop].message);
            }
        }
    };
    updateRoles = (role, checked) => {
        if (checked) {
            this.roles.push(role);
        } else {
            var index: number = this.roleIndex(role);
            if (index > -1){
                this.roles.splice(index, 1);
            }
        }
    };
    roleAlreadyAdded = (role) => { 
        for (let r of this.roles) {
            if (r._id === role._id) return true;
        }
    };
    roleIndex = (role) => {
        let i = 0;
        for (let r of this.roles) {
            if (r._id === role._id) {
                return i;
            }
            i++;
        }
    };
    addUser = function (user) {
        this._logger.log(user);
        return this._userService.addUser(user)
    };
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    };
} 