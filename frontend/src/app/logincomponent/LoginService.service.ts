import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import {PATHS} from "../helpers/helpers"

@Injectable()
export class LoginService {
    constructor(private http: Http) {
    }

    verifyUser(values: any) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        return this.http.post(PATHS.USERPATH + 'login', JSON.stringify(values), {headers: headers})
            .map(res => res.json());
    }

    addUser(values: any) {
        console.log('It reached here');
        console.log(values);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(PATHS.USERPATH + 'register', JSON.stringify(values), {headers: headers})
            .map(res => res.json());
    }

}

