
import {LoginComponent} from './logincomponent/loginForm.component';
import {Register} from './register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {Dashboard} from './dashboard/dashboard.component';

export const APP_ROUTES = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: Register},
  {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];


