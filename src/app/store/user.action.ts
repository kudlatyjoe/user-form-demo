import { Action } from "@ngrx/store";
import { User } from "../interfaces/User";


export const USER_CREATE = '[User] Create'

export class UserCreateAction implements Action {
    type = USER_CREATE
    payload: Readonly<User>
    constructor(user: User) {
        this.payload = user
    }
}

export const USER_CREATE_SUCCESS = '[User] Create success'


export class UserCreateSuccessAction implements Action {
    type = USER_CREATE_SUCCESS
    constructor(public payload: User) {}
}

export const USER_ERROR = '[User] Error'

export class UserErrorAction implements Action {
    type = USER_ERROR
    constructor(public err: any) {}
}

export type UserAction = UserCreateAction | UserCreateSuccessAction