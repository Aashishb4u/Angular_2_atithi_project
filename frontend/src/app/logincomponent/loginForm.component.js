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
var LoginService_service_1 = require("./LoginService.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
require("rxjs/add/operator/map");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_formbuilder, login_service, routes1) {
        this.login_service = login_service;
        this.routes1 = routes1;
        this.submitted = false;
        this.form = _formbuilder.group({
            'email': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            'password': ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(10)])]
        });
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (sessionStorage.getItem('id')) {
            this.routes1.navigate(['/dashboard']);
        }
    };
    LoginComponent.prototype.onSubmit = function (values) {
        var _this = this;
        this.submitted = true;
        var result;
        var role;
        //if form is valid then it will verify the user by checking object coming from html form.
        if (this.form.valid) {
            result = this.login_service.verifyUser(values);
            result.subscribe(function (logindata) {
                console.log(logindata);
                if (logindata.token) {
                    // if token is exist then it will navigate to dashboard and set values to session storage.
                    _this.routes1.navigate(['dashboard']);
                    sessionStorage.setItem('id', logindata.token);
                    sessionStorage.setItem('username', logindata.user.name);
                    sessionStorage.setItem('useremail', logindata.user.email);
                    if (logindata.user.admin === true) {
                        role = 'Admin';
                    }
                    else {
                        role = 'Receptionist';
                    }
                    sessionStorage.setItem('role', role);
                }
            }, function (error) {
                var toast = document.getElementById('toast');
                toast.className = 'show';
                toast.innerHTML = 'Please enter correct Username or Password.';
                setTimeout(function () {
                    toast.className = toast.className.replace('show', '');
                }, 3000);
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/logincomponent/logincomponent.html',
            providers: [LoginService_service_1.LoginService],
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, LoginService_service_1.LoginService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=loginForm.component.js.map