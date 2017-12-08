
import {LoginComponent} from './logincomponent/loginForm.component';
import {Register} from './register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {Dashboard} from './dashboard/dashboard.component';

/**
 * APP_ROUTES -
 * App routes for deciding routes on basis of path to fetch exact component.
 * AuthGuard -
 * AuthGuard is used to authenticate user.
 * @type {[{path: string; component: LoginComponent} , {path: string; component: Register} , {path: string; component: Dashboard; canActivate: [AuthGuard]} , {path: string; redirectTo: string; pathMatch: string} , {path: string; redirectTo: string; pathMatch: string}]}
 */

export const APP_ROUTES = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: Register},
  {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];


