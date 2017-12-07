import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import {DashService} from "./dashboard.service";
import {Router} from "@angular/router";
import {Visitors} from "../models/visitor";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    providers: [DashService],
    styleUrls: ['./dashboard.component.css']
})

export class Dashboard implements OnInit {

    public data: any[];
    public visitors: Visitors[];
    dashForm: FormGroup;
    dashForm1: FormGroup;
    search_array: Visitors[];
    public name: AbstractControl;
    public email: AbstractControl;
    public number: AbstractControl;
    public name1: AbstractControl;
    public email1: AbstractControl;
    public number1: AbstractControl;
    public intime: AbstractControl;
    public outtime: AbstractControl;
    public visitorid1: AbstractControl;
    public roleOf: Boolean;
    public visibleSubmit: Boolean = false;
    public visible: Boolean = false;
    public visiblelogout: boolean = false;
    public visitorInfo: any;
    public nouser: boolean = true;

    constructor(private _dashService: DashService, private formbuilder: FormBuilder, private router: Router) {
        this.dashForm = this.formbuilder.group({
            name: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])],
        });
        this.name = this.dashForm.controls['name'];
        this.email = this.dashForm.controls['email'];
        this.number = this.dashForm.controls['number'];

        this.dashForm1 = this.formbuilder.group({
            name1: ['', Validators.compose([Validators.required])],
            email1: ['', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)])],
            number1: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])],
            visitorid1: ['', [Validators.required]],
        });
        this.name1 = this.dashForm1.controls['name1'];
        this.email1 = this.dashForm1.controls['email1'];
        this.number1 = this.dashForm1.controls['number1'];
        this.visitorid1 = this.dashForm1.controls['visitorid1'];
    }

    ngOnInit() {
        // setting values to session storage on initialization of component.
        let role = sessionStorage.getItem('role') || 'Receptionist';
        let uname = sessionStorage.getItem('username').trim();
        let email = sessionStorage.getItem('useremail');
        let result = this._dashService.get_Visitors();

        result.subscribe(
            visitordata => {
                if (visitordata != null) {
                    // console.log(visitordata);
                    this.visitors = visitordata.visitors;
                    this.data = visitordata.visitors;
                    this.nouser = false;
                } else {
                    this.visitors = [];
                    this.data = [];
                    console.log('visitor No data');
                }
            });
        let input = document.getElementById('username');
        input.innerHTML = uname;
        let input1 = document.getElementById('userrole');
        input1.innerHTML = role;
        if (role === 'Admin') {
            this.roleOf = true;
        } else {
            this.roleOf = false;
        }
    }

    //Adding new visitor.
    add_Visitor(event: any, name: any, email: any, number: any) {
        let result;
        let new_visitor = {
            name: name.value.trim(),
            email: email.value.trim(),
            phone_no: number.value
        };
        result = this._dashService.save_Visitors(new_visitor);
        result.subscribe(
            visitor => {

                // Accepting values from dashboard.
                let visitorData = {
                    _id: visitor._id,
                    name: visitor.name.trim(),
                    email: visitor.email.trim(),
                    phone_no: visitor.phone_no,
                    out_time: visitor.out_time,
                    in_time: visitor.in_time,
                    is_active: visitor.is_active,
                };


                let addToast = document.getElementById('toast');
                addToast.className = 'show';
                addToast.style.backgroundColor = '#008000';
                addToast.innerHTML = 'Visitor added successfully.';
                this.getVisitors();
                this.dashForm.reset();
                setTimeout(function () {
                    addToast.className = addToast.className.replace('show', '');
                }, 2000);
            }, error => {
                let toast = document.getElementById('toast');
                toast.className = 'show';
                toast.innerHTML = error._body;
                toast.innerHTML = "Visitor with this email or number already exist.";
                this.dashForm.reset();
                toast.style.backgroundColor = '#FF0000';
                setTimeout(function () {
                    toast.className = toast.className.replace('show', '');
                }, 2000);
            });
    }

    getVisitors() {
        let result = this._dashService.get_Visitors();
        result.subscribe(
            visitordata => {
                if (visitordata != null) {
                    this.visitors = visitordata.visitors;
                    this.data = visitordata.visitors;
                    this.nouser = false;
                    //visitors come in visitor data
                    //console.log('visitor data');
                } else {
                    this.visitors = [];
                    this.data = [];
                    // console.log('visitor No data');
                    //no visitor found.
                }
            });
    }

    delete_Visitor(visitor: any) {
        let visitors = this.visitors;
        let result = this._dashService.delete_Visitor(visitor._id);
        console.log(visitor._id);
        result.subscribe(deletedVisitor => {
            //visitor has been deleted.
            // console.log("+++++++++++++++++", deletedVisitor);
            for (let index = 0; index < this.visitors.length; index++) {
                if (deletedVisitor._id === this.visitors[index]._id) {
                    this.visitors.splice(index, 1);
                }
            }
            this.getVisitors();
            let toast = document.getElementById('deleteToast');
            toast.className = 'show';
            toast.style.backgroundColor = '#008000';
            toast.innerHTML = 'Visitor deleted sucessfully';
            // this.getVisitors();
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 2000);
        });
    }

    get_Visitor(visitor: any) {
        let visitorName;
        let visitorEmail;
        let visitorPhoneno;
        let visitorInTime;
        let visitorOutTime;
        let visitorId;
        let result = this._dashService.get_Visitor(visitor._id);
        result.subscribe(function (visitorsdata: any) {

            visitorId = visitorsdata[0]._id;
            visitorName = visitorsdata[0].name.trim();
            visitorEmail = visitorsdata[0].email.trim();
            visitorPhoneno = visitorsdata[0].phone_no;
            visitorInTime = visitorsdata[0].in_time;
            visitorOutTime = visitorsdata[0].out_time;
        });
    }

    save_Visitor(values: any) {

        let visitorData = {
            _id: values.visitorid1,
            name: values.name1,
            email: values.email1,
            phone_no: values.number1,
            out_time: values.outtime,
            in_time: values.intime,
        };
        let result = this._dashService.update_Visitor(visitorData);
        result.subscribe(updatedData => {


            for (let index = 0; index < this.visitors.length; index++) {
                if (updatedData._id === this.visitors[index]._id) {
                    this.visitors[index].name = updatedData.name.trim();
                    this.visitors[index].email = updatedData.email;
                    this.visitors[index].phone_no = updatedData.phone_no;
                    this.visitors[index].in_time = updatedData.in_time;
                    this.visitors[index].out_time = updatedData.out_time;
                }
            }
            let toast = document.getElementById('updateToast');
            toast.className = 'show';
            toast.style.backgroundColor = '#008000';
            toast.innerHTML = 'Visitor updated sucessfully';
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 2000);
        }, error => {
            let toast = document.getElementById('updateToast');
            toast.className = 'show';
            toast.style.backgroundColor = '#FF0000';
            toast.innerHTML = error._body;
            setTimeout(function () {
                toast.className = toast.className.replace('show', '');
            }, 3000);
        });
    }

    showData(event: any) {

        // previously filled information.
        this.dashForm1.controls['name1'].patchValue(event.name);
        this.dashForm1.controls['email1'].patchValue(event.email);
        this.dashForm1.controls['number1'].patchValue(event.phone_no);
        this.dashForm1.controls['visitorid1'].patchValue(event._id);
    }

    logOut() {

        sessionStorage.removeItem('username');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('useremail');
        sessionStorage.clear();
        this.router.navigate(['']);

    }

    // Search Visitors by Name.
    search(event: any, search_data: any) {
        this.search_array = [];
        let search_String = search_data.value.toString().toLowerCase().trim();
        //console.log("search result", search_String);

        if (search_String.length > 0) {
            this.visitors.forEach(visitorlist => {
                let stringSearched = visitorlist.name.toString().toLowerCase().trim();
                console.log(stringSearched);
                if (stringSearched.search(search_String) != -1) {
                    this.search_array.push(visitorlist);
                    // console.log(visitorlist);
                    this.data = this.search_array;
                } else {
                    this.data = this.search_array;
                }
            });
            if (this.search_array.length === 0) {
                console.log("HI");
                let toast = document.getElementById('deleteToast');
                toast.className = 'show';
                toast.style.backgroundColor = '#FF0000';
                toast.innerHTML = 'No user found';
                setTimeout(function () {
                    toast.className = toast.className.replace('show', '');
                }, 3000);
            }

        }
        else {
            this.getVisitors();
        }

    }

    // OutTime of Visitors.
    outTime(visitor: any) {
        let out_visitor = {
            _id: visitor._id,
            name: visitor.name,
            email: visitor.email,
            phone_no: visitor.phone_no,
            in_time: visitor.in_time,
            out_time: visitor.out_time,
        };

        let result = this._dashService.check_Out(out_visitor);
        result.subscribe(updatedTime => {
            let index = 0;
            for (let index = 0; index < this.visitors.length; index++) {
                if (updatedTime._id === this.visitors[index]._id) {
                    this.visitors[index].name = updatedTime.name;
                    this.visitors[index].email = updatedTime.email;
                    this.visitors[index].phone_no = updatedTime.phone_no;
                    this.visitors[index].in_time = updatedTime.in_time;
                    this.visitors[index].out_time = updatedTime.out_time;

                }
            }
        });
    }

    //reset button.
    reset() {
        this.dashForm.reset();
    }

    //Showing Modal.
    show() {
        let modal = document.getElementById('submitModal');
        this.visibleSubmit = true;
    }

    //Hiding modal.
    hide() {
        this.visibleSubmit = false;
    }

    // hiding Log out modal
    hidelogOut() {
        this.visiblelogout = false;
    }

    showDelete(visitor: any) {
        this.visitorInfo = visitor;
        //let modal = document.getElementById('deleteModal');

        this.visible = true;
    }

    //showing logout modal.
    showlogout() {
        this.visiblelogout = true;
    }

    hideDelete() {
        this.visible = false;
    }

    delVis() {
        this.delete_Visitor(this.visitorInfo);
    }

}



