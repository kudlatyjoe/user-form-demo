import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Observable, of } from "rxjs";
import * as User from "./user.action"
import { UserHttp } from "../http/UserHttp.service";
import { switchMap, map, catchError } from "rxjs/operators"

@Injectable()
export class UserEffects {
    $get: Observable<any> = createEffect((): any => 
        this.action$.pipe(
            ofType(User.USER_CREATE),
            switchMap((action: User.UserAction) => 
                this.userHttp
                .get(action.payload)
                .pipe(
                    map(data => new User.UserCreateSuccessAction(data)),
                    catchError(err => of(new User.UserErrorAction(err)))
                )
            )
        )
    )

    constructor(
        private action$: Actions,
        private userHttp: UserHttp 
    ) {}
}