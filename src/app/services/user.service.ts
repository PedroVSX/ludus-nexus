import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { UserProfile } from "../models/user-profile";

@Injectable({
  providedIn: "root"
})
export class UserService {

    private apiUrl = "http://localhost:8081/users"

    constructor(private http: HttpClient) {}

    getProfile(username: string): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/profile/${username}`);
    }

}