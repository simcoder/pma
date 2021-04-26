import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  login: any;
  hasUserBeenLoaded: boolean;
}

export const initialState = {
  hasUserBeenLoaded: false,
  login: null
};

export function authReducer(state: State, action: AuthActions) {
  switch (action.type) {
    case AuthActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload,
      };
    default:
      return state;
  }
}
