"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var ng2_table_1 = require("ng2-table/ng2-table");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var angular2_toaster_1 = require("angular2-toaster");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var angular2_datatable_1 = require("angular2-datatable");
var auth_guard_1 = require("./guards/auth.guard");
var app_routing_1 = require("./app.routing");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var app_component_1 = require("./app.component");
var loginForm_component_1 = require("./logincomponent/loginForm.component");
var LoginService_service_1 = require("./logincomponent/LoginService.service");
var http_1 = require("@angular/http");
var default_component_1 = require("./default.component");
var register_component_1 = require("./register/register.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                router_1.RouterModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                common_1.CommonModule,
                http_1.HttpModule,
                ng2_table_1.Ng2TableModule,
                angular2_datatable_1.DataTableModule,
                ng2_bootstrap_1.PaginationModule.forRoot(),
                angular2_toaster_1.ToasterModule,
                router_1.RouterModule.forRoot(app_routing_1.APP_ROUTES)
            ],
            declarations: [app_component_1.AppComponent,
                loginForm_component_1.LoginComponent,
                dashboard_component_1.Dashboard,
                default_component_1.DefaultComponent,
                register_component_1.Register
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [LoginService_service_1.LoginService,
                auth_guard_1.AuthGuard],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map