import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginService {
    public serviceUrl: any ='/api/authenticate';


    constructor(private http: Http) {
        
    }
    login(value) {
        const headers = new Headers();
        
        return this.http.post(this.serviceUrl, value)
            .map((response: Response) => {
                const user = response.json();
               localStorage.setItem('token', user.token);
               console.log(user.token)
                return user;
            });
    }
    logout() {

    }
}
