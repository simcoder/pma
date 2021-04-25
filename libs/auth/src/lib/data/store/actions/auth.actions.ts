import { Action } from "@ngrx/store";

export enum AuthActionTypes {
    USER_LOGIN_SUCCESS = "USER_LOGIN SUCCESS",
    USER_LOGIN = "USER_LOGIN"
}
export class UserLoginSuccess implements Action {
    readonly type = AuthActionTypes.USER_LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class UserLogin implements Action {
    readonly type = AuthActionTypes.USER_LOGIN;
}

export type AuthActions =
| UserLogin
| UserLoginSuccess;