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
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var helpers_1 = require("../helpers/helpers");
var LoginService = /** @class */ (function () {
    function LoginService(http) {
        this.http = http;
    }
    LoginService.prototype.verifyUser = function (values) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(helpers_1.PATHS.USERPATH + 'login', JSON.stringify(values), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    LoginService.prototype.addUser = function (values) {
        console.log('It reached here');
        console.log(values);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(helpers_1.PATHS.USERPATH + 'register', JSON.stringify(values), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=LoginService.service.js.map