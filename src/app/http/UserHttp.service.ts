import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../interfaces/User";

@Injectable({
    providedIn: 'root'
})
export class UserHttp {
    constructor() {}

    get(params: User): Observable<User> {
        const user =  new User(params)
        return of(user)
    }
}