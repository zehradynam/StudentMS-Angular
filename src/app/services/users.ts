import { HttpClient } from "@angular/common/http";
import {User as UserModel } from '../models/user'
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})


export class UserService {
    // private apiURL = "http://localhost:5204/api/user/login";
    private apiURL = "https://studentms.runasp.net/api/user/login";
    private signUpURL = "https://studentms.runasp.net/api/user/signup";
    

    constructor(private http: HttpClient) { }

    loginUser(user: UserModel): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.apiURL, user);
    }

    signUp(user: UserModel): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.signUpURL, user);
    }
}
