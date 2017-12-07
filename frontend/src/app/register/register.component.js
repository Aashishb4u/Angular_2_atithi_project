"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoginService_service_1 = require("../logincomponent/LoginService.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var Register = /** @class */ (function () {
    function Register(_formBuilder, login_service, routes1) {
        this.login_service = login_service;
        this.routes1 = routes1;
        this.submitted = false;
        console.log('hello user');
        console.log('go to guestmodel and register component make admin=true');
        this.form = _formBuilder.group({
            'name': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1), forms_1.Validators.pattern(/^\S/)])],
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            'passwords': _formBuilder.group({
                'password': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1)])],
                'repeatPassword': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(1)])]
            })
        });
        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.passwords = this.form.controls['passwords'];
        this.password = this.passwords.controls['password'];
        this.repeatPassword = this.passwords.controls['repeatPassword'];
    }
    Register.prototype.ngOnInit = function () {
        if (sessionStorage.getItem('id')) {
            this.routes1.navigate(['/dashboard']);
        }
    };
    Register.prototype.checkPassword = function () {
        console.log("change click");
    };
    //when data is submitted by user then onSubmit method will be called
    Register.prototype.onSubmit = function (values) {
        var _this = this;
        this.submitted = true;
        var result;
        var role = false; //admin = true receptionist = false
        var registerData = {
            name: values.name.trim(),
            email: values.email.trim(),
            password: values.passwords.password,
            confirm_password: values.passwords.repeatPassword
        };
        result = this.login_service.addUser(registerData);
        result.subscribe(function (data) {
            var toast = document.getElementById('toast');
            toast.className = 'show';
            toast.style.backgroundColor = 'red';
            toast.innerHTML = 'Registered Successfully';
            //Toast will come and remain for 3 seconds.
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 3001);
            //If token will come then It will navigate to dashboard.
            if (data.token) {
                _this.routes1.navigate(['dashboard']);
                sessionStorage.setItem('id', data.token);
                sessionStorage.setItem('username', registerData.name);
                console.log("I am at dashboard");
                if (role === true) {
                    role = 'Admin';
                }
                else {
                    role = 'Receptionist';
                }
                console.log("User Role : ", role);
                sessionStorage.setItem('role', role);
            }
        }, function (error) {
            var toast = document.getElementById('toast');
            toast.className = 'show';
            toast.innerHTML = error._body;
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 3001);
        });
    };
    //when signup button is clicked then it will navigate to dashboard.
    Register.prototype.dashback = function () {
        this.routes1.navigate(['dashboard']);
    };
    Register = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LoginService_service_1.LoginService, router_1.Router])
    ], Register);
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=register.component.js.map