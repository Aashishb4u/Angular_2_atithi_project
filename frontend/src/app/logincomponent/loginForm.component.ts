import {Component, OnInit} from '@angular/core';
import {LoginService} from './LoginService.service';
import {Router} from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
    selector: 'login',
    templateUrl: 'app/logincomponent/logincomponent.html',
    providers: [LoginService],
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;

    constructor(_formbuilder: FormBuilder, private login_service: LoginService, private routes1: Router) {
        this.form = _formbuilder.group({
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(10)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }

    ngOnInit() {
        if (sessionStorage.getItem('id')) {
            this.routes1.navigate(['/dashboard']);
        }
    }

    public onSubmit(values: Object) {
        this.submitted = true;
        let result;
        let role;
        //if form is valid then it will verify the user by checking object coming from html form.
        if (this.form.valid) {
            result = this.login_service.verifyUser(values);
            result.subscribe(
                (logindata: any) => {
                    console.log(logindata);
                    if (logindata.token) {
                        // if token is exist then it will navigate to dashboard and set values to session storage.
                        this.routes1.navigate(['dashboard']);
                        sessionStorage.setItem('id', logindata.token);
                        sessionStorage.setItem('username', logindata.user.name);
                        sessionStorage.setItem('useremail', logindata.user.email);

                        if (logindata.user.admin === true) {
                            role = 'Admin';
                        } else {
                            role = 'Receptionist';
                        }
                        sessionStorage.setItem('role', role);
                    }
                },
                (error: any) => {
                    let toast = document.getElementById('toast');
                    toast.className = 'show';
                    toast.innerHTML = 'Please enter correct Username or Password.';
                    setTimeout(function () {
                        toast.className = toast.className.replace('show', '');
                    }, 3000);
                }
            );
        }
    }
}
