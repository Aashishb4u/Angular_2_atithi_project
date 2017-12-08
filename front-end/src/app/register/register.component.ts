import {Component, OnInit} from '@angular/core';
import {LoginService} from '../logincomponent/LoginService.service';
import {Router} from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {PATHS} from '../helpers/helpers';


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class Register implements OnInit {
    public form: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public repeatPassword: AbstractControl;
    public passwords: FormGroup;
    public roleOf: Boolean;
    public submitted: boolean = false;

    constructor(_formBuilder: FormBuilder, private login_service: LoginService, private routes1: Router) {
        this.form = _formBuilder.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(/^\S/)])],
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            'passwords': _formBuilder.group({
                'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
                'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
            })
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = <FormGroup> this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
    }

    /**
     * Initiating signup component.
     * checking whether user id loggedIn by fetching id from session storage.
     */

    ngOnInit() {
        if (sessionStorage.getItem('id')) {
            this.routes1.navigate(['/dashboard']);
        }
    }

    /**
     * when data is submitted by user then onSubmit method will be called
     * @param values
     */

    public onSubmit(values: any) {
        this.submitted = true;
        let result;
        let role: any = false;    //admin = true receptionist = false
        let registerData = {
            name: values.name.trim(),
            email: values.email.trim(),
            password: values.passwords.password,
            confirm_password: values.passwords.repeatPassword
        };
        result = this.login_service.addUser(registerData);
        result.subscribe(
            data => {
                let toast = document.getElementById('toast');
                toast.className = 'show';
                toast.style.backgroundColor = 'red';
                toast.innerHTML = PATHS.REGISTER_MSG;

                //Toast will come and remain for 3 seconds.
                setTimeout(function () {
                    toast.className = toast.className.replace('show', '');
                }, 3001);

                //If token will come then It will navigate to dashboard.
                if (data.token) {
                    this.routes1.navigate(['dashboard']);
                    sessionStorage.setItem('id', data.token);
                    sessionStorage.setItem('username', registerData.name);
                    if (role === true) {
                        role = 'Admin';
                    } else {
                        role = 'Receptionist';
                    }
                    sessionStorage.setItem('role', role);
                }
            }, error => {
                let toast = document.getElementById('toast');
                toast.className = 'show';
                toast.innerHTML = error._body;
                setTimeout(function () {
                    toast.className = toast.className.replace('show', '');
                }, 3001);
            }
        );
    }

    /**
     * when signup button is clicked then it will navigate to dashboard.
     */

    dashback() {
        this.routes1.navigate(['dashboard']);
    }
}

