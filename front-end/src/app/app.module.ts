import { NgModule }      from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap/ng2-bootstrap';
import {ToasterModule} from 'angular2-toaster';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {DataTableModule} from 'angular2-datatable';
import {AuthGuard} from './guards/auth.guard';
import { APP_ROUTES } from './app.routing';

 import {Dashboard} from './dashboard/dashboard.component';
import { AppComponent }  from './app.component';
import {LoginComponent} from './logincomponent/loginForm.component';
import {LoginService} from './logincomponent/LoginService.service';
import {HttpModule} from '@angular/http';
import {DefaultComponent} from './default.component';
import {Register} from './register/register.component';


@NgModule({
  imports:      [ BrowserModule,
                  RouterModule,
                  ReactiveFormsModule,
                  FormsModule,
                  CommonModule,
                  HttpModule,
                  Ng2TableModule,
                  DataTableModule,
                  PaginationModule.forRoot(),
                  ToasterModule,
    RouterModule.forRoot(APP_ROUTES)
                ],
  declarations: [ AppComponent,
                 LoginComponent,
                  Dashboard,
                 DefaultComponent,
                 Register
                ],
  bootstrap:    [ AppComponent ],
  providers:    [LoginService,
                 AuthGuard],
})
export class AppModule { }
