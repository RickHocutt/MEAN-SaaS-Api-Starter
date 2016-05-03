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
    selector: 'editUsers',
    templateUrl: 'app/html/edit-user.component.html',
})

export class EditComponent {
    cachedUser:any;
    username:AbstractControl;
    fname:AbstractControl;
    lname:AbstractControl;
    passwords:AbstractControl;
    roles:Array<Role>;
    email:AbstractControl;
    editUserForm:ControlGroup;
    availableRoles:Array<Role>;
    selectedRoles:Array<Role>;
    errors:Array<string>;
    userId:string;
    changingPassword:Boolean;
    changingRoles:Boolean;
    isProfileEdit:Boolean;
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
            this.selectedRoles = [];
            this.initForm();
            this.userId = this._params.get('id');
            this.isProfileEdit = (this._auth.user && (this._auth.user._id === this.userId));
            if (!this._auth.isAdmin && !this.isProfileEdit) {
                this._router.navigate(['Home']);
            }
            this._logger.log(this.userId);
            this._userService.getUser(this.userId)
                .subscribe(
                    (doc) => {
                        if (!doc.error) {
                            this.cachedUser = doc.user;
                            this.updateFormData();
                        } else {
                            this._logger.log('Unable to find user ' + this.userId)
                        }
                    },
                    (err) => this._logger.log('Unable to find user ' + this.userId)
                );
        }
        isAdmin = this._auth.admin;
        currentUserIsAdmin = () => {
            if (!this.roles) return false;
            for (var i = 0; i < this.roles.length; i++) {
                if (this.roles[i].label == 'admin')
                    return this.isProfileEdit;
            }
            return false;
        };
        initForm = () => {
            if (this.editUserForm) {
                this.cachedUser.fname = this.fname.value;
                this.cachedUser.lname = this.lname.value;
                this.cachedUser.username = this.username.value;
                this.cachedUser.email = this.email.value;
                delete this.editUserForm;
            }
            this.editUserForm = this._fb.group({
                username: ['', Validators.required],
                email: ['', Validators.required],
                fname: ['', Validators.required],
                lname: ['', Validators.required],
                passwords: this._fb.group({
                    password: [''],
                    verifyPassword: ['']
                }, {validator: this.areEqual})
            });
            this.lname = this.editUserForm.controls['lname'];
            this.fname = this.editUserForm.controls['fname'];
            this.username = this.editUserForm.controls['username'];
            this.passwords = this.editUserForm.controls['passwords'];
            this.email = this.editUserForm.controls['email'];
            this.updateFormData();
        };
        updateFormData = () => {
            let user = this.cachedUser;
            if (user) {
                (<Control>this.fname).updateValue(user.fname);
                (<Control>this.lname).updateValue(user.lname);
                (<Control>this.email).updateValue(user.email);
                (<Control>this.username).updateValue(user.username);
                this.roles = user.roles;
            }
        }
        areEqual = (group:ControlGroup) => {
            var valid = false;
            var val = '';
            for (name in group.controls) {
                if (val.length == 0) {
                    val = group.controls[name].value;
                } else {
                    if (val == group.controls[name].value) {
                        valid = true;
                    }
                }
            }
            return valid || !this.changingPassword ? null : { invalidAreEqual: true };
        };
        submitted = false;
        success = false;
        error = null;
        updateUser = (user) => {
            this._logger.log(user);
            return this._userService.updateUser(user);
        }
        handleSubmit = () => {
            let model = {
                _id: this.userId,
                username: this.username.value,
                email: this.email.value,
                fname: this.fname.value,
                lname: this.lname.value,
                roles: this.roles,
                password: this.passwords.value.password && this.passwords.value.password.length ? this.passwords.value.password : undefined
            }
            this.submitted = true;
            this.success = false;
            this.error = null;
            this.updateUser(model)
                .subscribe(
                    (doc) => {
                        if (!doc.error) {
                            this.success = true;
                            this.error = false;
                            if (this.isProfileEdit) {
                                if (this._auth.user) {
                                    Object.assign(this._auth.user, model);
                                }
                            }
                        } else {
                            this.success = false; 
                            this.error = true;
                            this.setErrorMessages(doc.error);
                        }
                    },
                    (err) => this.success = false,
                    () => this.submitted = false
                );
        };
        setErrorMessages = (errorObj) => {
            var errors = errorObj.errors;
            this.errors = [];
            this.errors.push(errorObj.message);
            for (var prop in errors) {
                if (errors[prop] && errors[prop].message) {
                    this.errors.push(errors[prop].message);
                }
            }
        };
        changePassword = () => {
            this.changingPassword = true;
            /* 
             * To learn why detectChanges() is called here, check out http://stackoverflow.com/questions/34827334/triggering-angular2-change-detection-manually
             * and https://angular.io/docs/ts/latest/api/core/ChangeDetectorRef-class.html#!#detectChanges
             */
            this._changeDetector.detectChanges();
        }
        cancelChangePassword = () => {
            this.changingPassword = false;
            this.initForm();
        }
        goToChangeRoles = () => {
            this.changingRoles = true;
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
        }
    diagnostic = function (obj) {
        return JSON.stringify(obj);
    }
} 