import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { User } from "../interfaces/User";
import * as fromStore from './../store/index'

@Injectable({
    providedIn: 'root'
})
export class SessionStorageFacade {
    user$ = this.store.select(fromStore.selectUser)

    ngUnsubscribe = new Subject()

    constructor(private store: Store<fromStore.State>) {
        this.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: User) => {
            sessionStorage.setItem('user', JSON.stringify(data))
        })
    }

    getUser() {
        return new User(JSON.parse(sessionStorage.getItem('user')||''))
    }
}