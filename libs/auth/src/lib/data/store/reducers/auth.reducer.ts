import { AuthActions, AuthActionTypes } from "../actions/auth.actions";

export interface State {
    user: any;
};

export const initialState = {
    user : null
};


export function authReducer(state: State, action: AuthActions) {
    switch (action.type) {
        case AuthActionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }    
        default:
            return state
    }
   
}