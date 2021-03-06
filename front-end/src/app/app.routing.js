"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loginForm_component_1 = require("./logincomponent/loginForm.component");
var register_component_1 = require("./register/register.component");
var auth_guard_1 = require("./guards/auth.guard");
var dashboard_component_1 = require("./dashboard/dashboard.component");
/**
 * APP_ROUTES -
 * App routes for deciding routes on basis of path to fetch exact component.
 * AuthGuard -
 * AuthGuard is used to authenticate user.
 * @type {[{path: string; component: LoginComponent} , {path: string; component: Register} , {path: string; component: Dashboard; canActivate: [AuthGuard]} , {path: string; redirectTo: string; pathMatch: string} , {path: string; redirectTo: string; pathMatch: string}]}
 */
exports.APP_ROUTES = [
    { path: 'login', component: loginForm_component_1.LoginComponent },
    { path: 'register', component: register_component_1.Register },
    { path: 'dashboard', component: dashboard_component_1.Dashboard, canActivate: [auth_guard_1.AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
//# sourceMappingURL=app.routing.js.map