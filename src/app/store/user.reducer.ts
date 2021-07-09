import { Action } from "@ngrx/store";
import { User } from "../interfaces/User";
import { UserAction, USER_CREATE_SUCCESS } from "./user.action";

const initialState = new User(JSON.parse(sessionStorage.getItem('user')||'{}'))

export function userReducer(state = initialState, action: Action) {
    const userAction = action as UserAction
    switch (userAction.type) {
        case USER_CREATE_SUCCESS:
            return {...userAction.payload}
        default: 
            return state
    }
}