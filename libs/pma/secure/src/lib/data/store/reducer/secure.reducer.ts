import { SecureActions, SecureActionTypes } from "../actions/secure.actions";

export interface State {
    menu: any;
    hasLoaded: boolean;
};

export const initialState: State = {
    menu : null,
    hasLoaded: false
};


export function secureReducer(state: State, action: SecureActions) {
    switch (action.type) {
        case SecureActionTypes.LOAD_APP_MENU_SUCCESS:
            return {
                ...state,
                hasLoaded: true,
                menu: action.payload
            } 
        case SecureActionTypes.LOAD_APP_MENU_FAILURE:
                return {
                    ...state,
                    hasLoaded: false
                }    
        default:
            return state
    }
   
}