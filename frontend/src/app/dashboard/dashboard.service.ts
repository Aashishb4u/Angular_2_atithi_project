import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {PATHS} from "../helpers/helpers"

@Injectable()
export class DashService {
    constructor(private _http: Http) {
    }

    update_Visitor(visitorData: any) {
        console.log('m update');
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({headers: headers});
        console.log(options);
        return this._http.post( PATHS.VISITORPATH +'update/' + visitorData._id, JSON.stringify(visitorData), options)
            .map(res => res.json());
    }

    get_Visitors() {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({headers: headers});
        let data = {
            'str': 'str'
        };
        return this._http.post(PATHS.VISITORPATH + 'getall', JSON.stringify(data), options)
            .map(res => res.json());
    }

    save_Visitors(visitor: any) {
        console.log(visitor);
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({headers: headers});
        console.log(options);
        return this._http.post(PATHS.VISITORPATH + 'addvisitor', JSON.stringify(visitor), options)
            .map(res => res.json());
    }

    delete_Visitor(id: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({headers: headers});
        console.log(headers);
        return this._http.delete(PATHS.VISITORPATH + 'delete/' + id, options)
            .map(res => res.json());
    }

    get_Visitor(id: any) {
        console.log('m get');
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({headers: headers});
        return this._http.get(PATHS.VISITORPATH + 'get/' + id, options)
            .map(res => res.json());
    }

    check_Out(visitorData: any) {
        console.log('m get');
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        let options = new RequestOptions({headers: headers});
        return this._http.post(PATHS.VISITORPATH + 'checkout', JSON.stringify(visitorData), options)
            .map(res => res.json());

    }

    createAuthorizationHeader(headers: Headers) {
        let id = sessionStorage.getItem('id');
        headers.append('Content-Type', 'application/json');
        headers.append('token', id);
    }

}


