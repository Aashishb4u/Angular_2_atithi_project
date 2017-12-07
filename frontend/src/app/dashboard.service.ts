import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


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
    return this._http.post('http://localhost:8080/api/visitor/update/' + visitorData._id , JSON.stringify(visitorData), options)
      .map(res => res.json());
  }

  get_Visitors() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    let data = {
      'str': 'str'
    };
    return this._http.post('http://localhost:8080/api/visitor/getall', JSON.stringify(data), options)
      .map(res => res.json());
  }

  save_Visitors(visitor: any) {
    console.log(visitor);
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    console.log(options);
    return this._http.post('http://localhost:8080/api/visitor/addvisitor', JSON.stringify(visitor), options)
      .map(res => res.json());
  }

  delete_Visitor(id: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    console.log(headers);
    return this._http.delete('http://localhost:8080/api/visitor/delete/' + id, options)
      .map(res => res.json());
  }

  get_Visitor(id: any) {
    console.log('m get');
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    return this._http.get('http://localhost:8080/api/visitor/get/' + id, options)
      .map(res => res.json());
  }

  check_Out(visitorData: any) {
    console.log('m get');
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    return this._http.post('http://localhost:8080/api/visitor/checkout', JSON.stringify(visitorData), options)
      .map(res => res.json());

  }

  createAuthorizationHeader(headers: Headers) {
    let id = sessionStorage.getItem('id');
    headers.append('Content-Type', 'application/json');
    headers.append('token', id);
  }

}


