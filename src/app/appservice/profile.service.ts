import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AuthService } from '../auth/auth.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {
    constructor(
        private http: Http,
        private  authservice:AuthService
    ) { }
    getprofile(): Observable<any>{
        console.log(this.authservice.token);
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authservice.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get('/api/profile', options)
        .map((response: Response) => response.json());
    }
}