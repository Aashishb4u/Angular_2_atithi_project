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
var forms_1 = require("@angular/forms");
var dashboard_service_1 = require("./dashboard.service");
var router_1 = require("@angular/router");
var Dashboard = /** @class */ (function () {
    function Dashboard(_dashService, formbuilder, router) {
        this._dashService = _dashService;
        this.formbuilder = formbuilder;
        this.router = router;
        this.visibleSubmit = false;
        this.visible = false;
        this.visiblelogout = false;
        this.nouser = true;
        this.dashForm = this.formbuilder.group({
            name: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            number: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), forms_1.Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])],
        });
        this.name = this.dashForm.controls['name'];
        this.email = this.dashForm.controls['email'];
        this.number = this.dashForm.controls['number'];
        this.dashForm1 = this.formbuilder.group({
            name1: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            email1: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            number1: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(10), forms_1.Validators.maxLength(10), forms_1.Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])],
            visitorid1: ['', [forms_1.Validators.required]],
        });
        this.name1 = this.dashForm1.controls['name1'];
        this.email1 = this.dashForm1.controls['email1'];
        this.number1 = this.dashForm1.controls['number1'];
        this.visitorid1 = this.dashForm1.controls['visitorid1'];
    }
    Dashboard.prototype.ngOnInit = function () {
        var _this = this;
        // setting values to session storage on initialization of component.
        var role = sessionStorage.getItem('role') || 'Receptionist';
        var uname = sessionStorage.getItem('username').trim();
        var email = sessionStorage.getItem('useremail');
        var result = this._dashService.get_Visitors();
        result.subscribe(function (visitordata) {
            if (visitordata != null) {
                // console.log(visitordata);
                _this.visitors = visitordata.visitors;
                _this.data = visitordata.visitors;
                _this.nouser = false;
            }
            else {
                _this.visitors = [];
                _this.data = [];
                console.log('visitor No data');
            }
        });
        var input = document.getElementById('username');
        input.innerHTML = uname;
        var input1 = document.getElementById('userrole');
        input1.innerHTML = role;
        if (role === 'Admin') {
            this.roleOf = true;
        }
        else {
            this.roleOf = false;
        }
    };
    //Adding new visitor.
    Dashboard.prototype.add_Visitor = function (event, name, email, number) {
        var _this = this;
        var result;
        var new_visitor = {
            name: name.value.trim(),
            email: email.value.trim(),
            phone_no: number.value
        };
        result = this._dashService.save_Visitors(new_visitor);
        result.subscribe(function (visitor) {
            // Accepting values from dashboard.
            var visitorData = {
                _id: visitor._id,
                name: visitor.name.trim(),
                email: visitor.email.trim(),
                phone_no: visitor.phone_no,
                out_time: visitor.out_time,
                in_time: visitor.in_time,
                is_active: visitor.is_active,
            };
            var addToast = document.getElementById('toast');
            addToast.className = 'show';
            addToast.style.backgroundColor = '#008000';
            addToast.innerHTML = 'Visitor added successfully.';
            _this.getVisitors();
            _this.dashForm.reset();
            setTimeout(function () {
                addToast.className = addToast.className.replace('show', '');
            }, 2000);
        }, function (error) {
            var toast = document.getElementById('toast');
            toast.className = 'show';
            toast.innerHTML = error._body;
            toast.innerHTML = "Visitor with this email or number already exist.";
            _this.dashForm.reset();
            toast.style.backgroundColor = '#FF0000';
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 2000);
        });
    };
    Dashboard.prototype.getVisitors = function () {
        var _this = this;
        var result = this._dashService.get_Visitors();
        result.subscribe(function (visitordata) {
            if (visitordata != null) {
                _this.visitors = visitordata.visitors;
                _this.data = visitordata.visitors;
                _this.nouser = false;
                //visitors come in visitor data
                //console.log('visitor data');
            }
            else {
                _this.visitors = [];
                _this.data = [];
                // console.log('visitor No data');
                //no visitor found.
            }
        });
    };
    Dashboard.prototype.delete_Visitor = function (visitor) {
        var _this = this;
        var visitors = this.visitors;
        var result = this._dashService.delete_Visitor(visitor._id);
        console.log(visitor._id);
        result.subscribe(function (deletedVisitor) {
            //visitor has been deleted.
            // console.log("+++++++++++++++++", deletedVisitor);
            for (var index = 0; index < _this.visitors.length; index++) {
                if (deletedVisitor._id === _this.visitors[index]._id) {
                    _this.visitors.splice(index, 1);
                }
            }
            _this.getVisitors();
            var toast = document.getElementById('deleteToast');
            toast.className = 'show';
            toast.style.backgroundColor = '#008000';
            toast.innerHTML = 'Visitor deleted sucessfully';
            // this.getVisitors();
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 2000);
        });
    };
    Dashboard.prototype.get_Visitor = function (visitor) {
        var visitorName;
        var visitorEmail;
        var visitorPhoneno;
        var visitorInTime;
        var visitorOutTime;
        var visitorId;
        var result = this._dashService.get_Visitor(visitor._id);
        result.subscribe(function (visitorsdata) {
            visitorId = visitorsdata[0]._id;
            visitorName = visitorsdata[0].name.trim();
            visitorEmail = visitorsdata[0].email.trim();
            visitorPhoneno = visitorsdata[0].phone_no;
            visitorInTime = visitorsdata[0].in_time;
            visitorOutTime = visitorsdata[0].out_time;
        });
    };
    Dashboard.prototype.save_Visitor = function (values) {
        var _this = this;
        var visitorData = {
            _id: values.visitorid1,
            name: values.name1,
            email: values.email1,
            phone_no: values.number1,
            out_time: values.outtime,
            in_time: values.intime,
        };
        var result = this._dashService.update_Visitor(visitorData);
        result.subscribe(function (updatedData) {
            for (var index = 0; index < _this.visitors.length; index++) {
                if (updatedData._id === _this.visitors[index]._id) {
                    _this.visitors[index].name = updatedData.name.trim();
                    _this.visitors[index].email = updatedData.email;
                    _this.visitors[index].phone_no = updatedData.phone_no;
                    _this.visitors[index].in_time = updatedData.in_time;
                    _this.visitors[index].out_time = updatedData.out_time;
                }
            }
            var toast = document.getElementById('updateToast');
            toast.className = 'show';
            toast.style.backgroundColor = '#008000';
            toast.innerHTML = 'Visitor updated sucessfully';
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 2000);
        }, function (error) {
            var toast = document.getElementById('updateToast');
            toast.className = 'show';
            toast.style.backgroundColor = '#FF0000';
            toast.innerHTML = error._body;
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 3000);
        });
    };
    Dashboard.prototype.showData = function (event) {
        // previously filled information.
        this.dashForm1.controls['name1'].patchValue(event.name);
        this.dashForm1.controls['email1'].patchValue(event.email);
        this.dashForm1.controls['number1'].patchValue(event.phone_no);
        this.dashForm1.controls['visitorid1'].patchValue(event._id);
    };
    Dashboard.prototype.logOut = function () {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('useremail');
        sessionStorage.clear();
        this.router.navigate(['']);
    };
    // Search Visitors by Name.
    Dashboard.prototype.search = function (event, search_data) {
        var _this = this;
        this.search_array = [];
        var search_String = search_data.value.toString().toLowerCase().trim();
        //console.log("search result", search_String);
        if (search_String.length > 0) {
            this.visitors.forEach(function (visitorlist) {
                var stringSearched = visitorlist.name.toString().toLowerCase().trim();
                console.log(stringSearched);
                if (stringSearched.search(search_String) != -1) {
                    _this.search_array.push(visitorlist);
                    // console.log(visitorlist);
                    _this.data = _this.search_array;
                }
                else {
                    _this.data = _this.search_array;
                }
            });
            if (this.search_array.length === 0) {
                console.log("HI");
                var toast_1 = document.getElementById('deleteToast');
                toast_1.className = 'show';
                toast_1.style.backgroundColor = '#FF0000';
                toast_1.innerHTML = 'No user found';
                setTimeout(function () {
                    toast_1.className = toast_1.className.replace('show', '');
                }, 3000);
            }
        }
        else {
            this.getVisitors();
        }
    };
    // OutTime of Visitors.
    Dashboard.prototype.outTime = function (visitor) {
        var _this = this;
        var out_visitor = {
            _id: visitor._id,
            name: visitor.name,
            email: visitor.email,
            phone_no: visitor.phone_no,
            in_time: visitor.in_time,
            out_time: visitor.out_time,
        };
        var result = this._dashService.check_Out(out_visitor);
        result.subscribe(function (updatedTime) {
            var index = 0;
            for (var index_1 = 0; index_1 < _this.visitors.length; index_1++) {
                if (updatedTime._id === _this.visitors[index_1]._id) {
                    _this.visitors[index_1].name = updatedTime.name;
                    _this.visitors[index_1].email = updatedTime.email;
                    _this.visitors[index_1].phone_no = updatedTime.phone_no;
                    _this.visitors[index_1].in_time = updatedTime.in_time;
                    _this.visitors[index_1].out_time = updatedTime.out_time;
                }
            }
        });
    };
    //reset button.
    Dashboard.prototype.reset = function () {
        this.dashForm.reset();
    };
    //Showing Modal.
    Dashboard.prototype.show = function () {
        var modal = document.getElementById('submitModal');
        this.visibleSubmit = true;
    };
    //Hiding modal.
    Dashboard.prototype.hide = function () {
        this.visibleSubmit = false;
    };
    // hiding Log out modal
    Dashboard.prototype.hidelogOut = function () {
        this.visiblelogout = false;
    };
    Dashboard.prototype.showDelete = function (visitor) {
        this.visitorInfo = visitor;
        //let modal = document.getElementById('deleteModal');
        this.visible = true;
    };
    //showing logout modal.
    Dashboard.prototype.showlogout = function () {
        this.visiblelogout = true;
    };
    Dashboard.prototype.hideDelete = function () {
        this.visible = false;
    };
    Dashboard.prototype.delVis = function () {
        this.delete_Visitor(this.visitorInfo);
    };
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: './dashboard.html',
            providers: [dashboard_service_1.DashService],
            styleUrls: ['./dashboard.component.css']
        }),
        __metadata("design:paramtypes", [dashboard_service_1.DashService, forms_1.FormBuilder, router_1.Router])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map