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
var http_2 = require("@angular/http");
require("rxjs/add/operator/map");
var DashService = (function () {
    function DashService(_http) {
        this._http = _http;
    }
    DashService.prototype.update_Visitor = function (visitorData) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_2.RequestOptions({ headers: headers });
        console.log(options);
        return this._http.post('http://localhost:8080/api/visitor/update/' + visitorData._id, JSON.stringify(visitorData), options)
            .map(function (res) { return res.json(); });
    };
    DashService.prototype.get_Visitors = function () {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_2.RequestOptions({ headers: headers });
        var data = {
            'str': 'str'
        };
        return this._http.post('http://localhost:8080/api/visitor/getall', JSON.stringify(data), options)
            .map(function (res) { return res.json(); });
    };
    DashService.prototype.save_Visitors = function (visitor) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:8080/api/visitor/addvisitor', JSON.stringify(visitor), options)
            .map(function (res) { return res.json(); });
    };
    DashService.prototype.delete_Visitor = function (id) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.delete('http://localhost:8080/api/visitor/delete/' + id, options)
            .map(function (res) { return res.json(); });
    };
    DashService.prototype.get_Visitor = function (id) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.get('http://localhost:8080/api/visitor/get/' + id, options)
            .map(function (res) { return res.json(); });
    };
    DashService.prototype.check_Out = function (visitorData) {
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_2.RequestOptions({ headers: headers });
        return this._http.post('http://localhost:8080/api/visitor/checkout', JSON.stringify(visitorData), options)
            .map(function (res) { return res.json(); });
    };
    DashService.prototype.createAuthorizationHeader = function (headers) {
        var id = sessionStorage.getItem('id');
        headers.append('Content-Type', 'application/json');
        headers.append('token', id);
    };
    DashService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DashService);
    return DashService;
}());
exports.DashService = DashService;
//# sourceMappingURL=dashboard.service.js.map